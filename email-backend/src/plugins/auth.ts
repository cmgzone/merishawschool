import fp from 'fastify-plugin';
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import prisma from '../lib/prisma.js';
import { decrypt, encrypt } from '../lib/crypto.js';
import { unauthorized } from '../lib/errors.js';
import { config } from '../config.js';

export interface JwtPayload {
  sub: number;
  sid: string;
  email: string;
}

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (req: FastifyRequest, reply: FastifyReply) => Promise<void>;
    adminOnly: (req: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}

export default fp(async (app: FastifyInstance) => {
  await app.register(import('@fastify/jwt'), {
    secret: config.jwtSecret,
    sign: { expiresIn: config.jwtExpiresIn },
  });

  app.decorate('authenticate', async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      await req.jwtVerify();
    } catch {
      return unauthorized(reply, 'Invalid or expired token');
    }
    const payload = req.user as JwtPayload;
    // Load the session to recover the encrypted mailbox password.
    const session = await prisma.session.findUnique({ where: { id: payload.sid } });
    if (!session || session.expiresAt < new Date()) {
      return unauthorized(reply, 'Session expired');
    }
    req.userId = payload.sub;
    req.sessionId = payload.sid;
    req.mailboxPassword = decrypt(session.encPassword);
  });

  app.decorate('adminOnly', async (req: FastifyRequest, reply: FastifyReply) => {
    await app.authenticate(req, reply);
    if (reply.sent) return;
    const payload = req.user as JwtPayload;
    const user = await prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user?.isAdmin) {
      return unauthorized(reply, 'Admin access required');
    }
  });
});

// Helper to mint a token + persist a session.
export async function createSession(app: FastifyInstance, userId: number, email: string, mailboxPassword: string): Promise<{ token: string; expiresAt: Date }> {
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // 7 days, also bounded by jwt
  const session = await prisma.session.create({
    data: {
      userId,
      encPassword: encrypt(mailboxPassword),
      expiresAt,
    },
  });
  const token = app.jwt.sign({ sub: userId, sid: session.id, email } satisfies JwtPayload);
  return { token, expiresAt };
}
