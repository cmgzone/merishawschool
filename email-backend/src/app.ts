import type { FastifyInstance, FastifyPluginAsync } from 'fastify';
import cors from '@fastify/cors';
import { config } from './config.js';
import { sendError } from './lib/errors.js';
import authPlugin from './plugins/auth.js';
import { authRoutes } from './routes/auth.js';
import { mailRoutes } from './routes/mail.js';
import { adminRoutes } from './routes/admin.js';

export async function buildApp(): Promise<FastifyInstance> {
  const { default: Fastify } = await import('fastify');
  const app: FastifyInstance = Fastify({ logger: config.nodeEnv === 'development' });

  await app.register(cors, {
    origin: config.corsOrigin === '*' ? true : config.corsOrigin.split(',').map((s) => s.trim()),
    credentials: true,
  });

  await app.register(authPlugin);

  app.get('/health', async (_req, reply) => reply.send({ status: 'ok', time: new Date().toISOString() }));

  await app.register(async (api: FastifyInstance) => {
    await api.register(authRoutes, { prefix: '/auth' });
    await api.register(mailRoutes, { prefix: '/mail' });
    await api.register(adminRoutes, { prefix: '/admin' });
  }, { prefix: '/api' });

  app.setErrorHandler((err, _req, reply) => {
    const statusCode =
      typeof err === 'object' && err !== null && 'statusCode' in err && typeof (err as { statusCode: unknown }).statusCode === 'number'
        ? (err as { statusCode: number }).statusCode
        : 500;
    if (statusCode >= 500) app.log.error(err);
    const message = err instanceof Error ? err.message : 'Internal Server Error';
    const name = err instanceof Error ? err.name : 'Error';
    return sendError(reply, statusCode, message, name);
  });

  return app;
}
