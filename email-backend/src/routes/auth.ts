import type { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import prisma from '../lib/prisma.js';
import { config } from '../config.js';
import { badRequest, notFound, unauthorized } from '../lib/errors.js';
import { createSession } from '../plugins/auth.js';
import { ImapFlow } from 'imapflow';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  imapHost: z.string().optional(),
  imapPort: z.number().int().optional(),
});

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  displayName: z.string().optional(),
  imapHost: z.string().optional(),
  imapPort: z.number().int().optional(),
  smtpHost: z.string().optional(),
  smtpPort: z.number().int().optional(),
});

async function verifyMailboxCredentials(email: string, password: string, host: string, port: number): Promise<boolean> {
  const client = new ImapFlow({
    host,
    port,
    secure: port === 993,
    auth: { user: email, pass: password },
    logger: false,
  });
  try {
    await client.connect();
    return true;
  } catch {
    return false;
  } finally {
    await client.logout().catch(() => undefined);
  }
}

function isAllowedMailbox(email: string): boolean {
  if (!config.allowedEmailDomain) return true;
  return email.toLowerCase().endsWith(`@${config.allowedEmailDomain.toLowerCase()}`);
}

export const authRoutes: FastifyPluginAsync = async (app: FastifyInstance) => {
  app.post('/register', async (req, reply) => {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) return badRequest(reply, parsed.error.issues[0]?.message ?? 'Invalid input');
    const { password, displayName, imapHost, imapPort, smtpHost, smtpPort } = parsed.data;
    const email = parsed.data.email.trim().toLowerCase();
    if (!isAllowedMailbox(email)) {
      return badRequest(reply, `Use your @${config.allowedEmailDomain} mailbox.`);
    }

    const iHost = imapHost ?? config.defaultImapHost;
    const iPort = imapPort ?? config.defaultImapPort;
    const sHost = smtpHost ?? config.defaultSmtpHost;
    const sPort = smtpPort ?? config.defaultSmtpPort;

    // Verify the mailbox password actually works against IMAP before storing.
    const ok = await verifyMailboxCredentials(email, password, iHost, iPort);
    if (!ok) return unauthorized(reply, 'IMAP login failed. Check email/password/host.');

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return badRequest(reply, 'Account already exists');

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        displayName,
        imapHost: iHost,
        imapPort: iPort,
        smtpHost: sHost,
        smtpPort: sPort,
      },
    });

    const { token, expiresAt } = await createSession(app, user.id, email, password);
    return reply.code(201).send({ token, expiresAt, user: { id: user.id, email, displayName: user.displayName ?? null, isAdmin: user.isAdmin } });
  });

  app.post('/login', async (req, reply) => {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) return badRequest(reply, parsed.error.issues[0]?.message ?? 'Invalid input');
    const { password, imapHost, imapPort } = parsed.data;
    const email = parsed.data.email.trim().toLowerCase();
    if (!isAllowedMailbox(email)) {
      return badRequest(reply, `Use your @${config.allowedEmailDomain} mailbox.`);
    }

    const user = await prisma.user.findUnique({ where: { email } });
    const iHost = imapHost ?? user?.imapHost ?? config.defaultImapHost;
    const iPort = imapPort ?? user?.imapPort ?? config.defaultImapPort;

    // Mailcow/IMAP is the source of truth. If the mailbox is valid, allow login
    // even when the local app user has not been created yet or the mailbox
    // password changed after the app user was created.
    const ok = await verifyMailboxCredentials(email, password, iHost, iPort);
    if (!ok) return unauthorized(reply, 'Invalid credentials');

    let appUser = user;
    if (!appUser) {
      appUser = await prisma.user.create({
        data: {
          email,
          passwordHash: await bcrypt.hash(password, 10),
          imapHost: iHost,
          imapPort: iPort,
          smtpHost: config.defaultSmtpHost,
          smtpPort: config.defaultSmtpPort,
        },
      });
    } else {
      const passwordOk = await bcrypt.compare(password, appUser.passwordHash);
      const updates: {
        passwordHash?: string;
        imapHost?: string;
        imapPort?: number;
      } = {};
      if (!passwordOk) updates.passwordHash = await bcrypt.hash(password, 10);
      if (imapHost && imapHost !== appUser.imapHost) updates.imapHost = iHost;
      if (imapPort && imapPort !== appUser.imapPort) updates.imapPort = iPort;
      if (Object.keys(updates).length > 0) {
        appUser = await prisma.user.update({ where: { id: appUser.id }, data: updates });
      }
    }

    const { token, expiresAt } = await createSession(app, appUser.id, email, password);
    return reply.send({ token, expiresAt, user: { id: appUser.id, email, displayName: appUser.displayName ?? null, isAdmin: appUser.isAdmin } });
  });

  app.get('/me', { preHandler: app.authenticate }, async (req, reply) => {
    const payload = req.user as { sub: number };
    const user = await prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user) return notFound(reply, 'User not found');
    return reply.send({ id: user.id, email: user.email, displayName: user.displayName, isAdmin: user.isAdmin });
  });

  app.post('/logout', { preHandler: app.authenticate }, async (req, reply) => {
    const payload = req.user as { sid: string };
    await prisma.session.deleteMany({ where: { id: payload.sid } });
    return reply.send({ ok: true });
  });
};
