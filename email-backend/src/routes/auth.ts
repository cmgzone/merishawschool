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
    const { email, password, displayName, imapHost, imapPort, smtpHost, smtpPort } = parsed.data;
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
    const { email, password, imapHost, imapPort } = parsed.data;
    if (!isAllowedMailbox(email)) {
      return badRequest(reply, `Use your @${config.allowedEmailDomain} mailbox.`);
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return unauthorized(reply, 'Invalid credentials');

    const passwordOk = await bcrypt.compare(password, user.passwordHash);
    if (!passwordOk) return unauthorized(reply, 'Invalid credentials');

    const iHost = imapHost ?? user.imapHost;
    const iPort = imapPort ?? user.imapPort;
    // Re-verify IMAP password still works (it may have been changed in mailcow).
    const ok = await verifyMailboxCredentials(email, password, iHost, iPort);
    if (!ok) return unauthorized(reply, 'Mailbox password no longer valid. Update it in mailcow.');

    const { token, expiresAt } = await createSession(app, user.id, email, password);
    return reply.send({ token, expiresAt, user: { id: user.id, email, displayName: user.displayName ?? null, isAdmin: user.isAdmin } });
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
