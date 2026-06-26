import type { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { z } from 'zod';
import { badRequest } from '../lib/errors.js';
import {
  createAlias,
  createDomain,
  createMailbox,
  deleteAlias,
  deleteDomain,
  deleteMailbox,
  listAliases,
  listDomains,
  listMailboxes,
  updateMailboxActive,
  updateMailboxPassword,
} from '../lib/mailcow.js';

const domainBody = z.object({
  domain: z.string().min(3),
  description: z.string().optional(),
  aliases: z.number().int().optional(),
  mailboxes: z.number().int().optional(),
  quota: z.number().int().optional(),
  active: z.boolean().optional(),
});

const mailboxBody = z.object({
  localPart: z.string().min(1),
  domain: z.string().min(3),
  name: z.string().min(1),
  password: z.string().min(6),
  quota: z.number().int().optional(),
  active: z.boolean().optional(),
});

const aliasBody = z.object({
  address: z.string().email(),
  goto: z.string().min(1),
  active: z.boolean().optional(),
});

const passwordBody = z.object({ password: z.string().min(6) });
const activeBody = z.object({ active: z.boolean() });

export const adminRoutes: FastifyPluginAsync = async (app: FastifyInstance) => {
  app.addHook('preHandler', app.adminOnly);

  // --- Domains ---
  app.get('/domains', async (_req, reply) => {
    const domains = await listDomains();
    return reply.send({ domains });
  });

  app.post('/domains', async (req, reply) => {
    const b = domainBody.safeParse(req.body);
    if (!b.success) return badRequest(reply, b.error.issues[0]?.message ?? 'Invalid input');
    const result = await createDomain(b.data);
    return reply.code(201).send({ result });
  });

  app.delete('/domains/:name', async (req, reply) => {
    const name = (req.params as { name: string }).name;
    const result = await deleteDomain(name);
    return reply.send({ result });
  });

  // --- Mailboxes ---
  app.get('/mailboxes', async (_req, reply) => {
    const mailboxes = await listMailboxes();
    return reply.send({ mailboxes });
  });

  app.post('/mailboxes', async (req, reply) => {
    const b = mailboxBody.safeParse(req.body);
    if (!b.success) return badRequest(reply, b.error.issues[0]?.message ?? 'Invalid input');
    const result = await createMailbox(b.data);
    return reply.code(201).send({ result });
  });

  app.delete('/mailboxes/:username', async (req, reply) => {
    const username = decodeURIComponent((req.params as { username: string }).username);
    const result = await deleteMailbox(username);
    return reply.send({ result });
  });

  app.post('/mailboxes/:username/password', async (req, reply) => {
    const username = decodeURIComponent((req.params as { username: string }).username);
    const b = passwordBody.safeParse(req.body);
    if (!b.success) return badRequest(reply, 'Invalid password');
    const result = await updateMailboxPassword(username, b.data.password);
    return reply.send({ result });
  });

  app.post('/mailboxes/:username/active', async (req, reply) => {
    const username = decodeURIComponent((req.params as { username: string }).username);
    const b = activeBody.safeParse(req.body);
    if (!b.success) return badRequest(reply, 'Invalid active value');
    const result = await updateMailboxActive(username, b.data.active);
    return reply.send({ result });
  });

  // --- Aliases ---
  app.get('/aliases', async (_req, reply) => {
    const aliases = await listAliases();
    return reply.send({ aliases });
  });

  app.post('/aliases', async (req, reply) => {
    const b = aliasBody.safeParse(req.body);
    if (!b.success) return badRequest(reply, b.error.issues[0]?.message ?? 'Invalid input');
    const result = await createAlias(b.data.address, b.data.goto, b.data.active ?? true);
    return reply.code(201).send({ result });
  });

  app.delete('/aliases/:id', async (req, reply) => {
    const id = Number((req.params as { id: string }).id);
    if (!Number.isInteger(id) || id <= 0) return badRequest(reply, 'Invalid alias id');
    const result = await deleteAlias(id);
    return reply.send({ result });
  });
};
