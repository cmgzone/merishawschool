import type { FastifyInstance, FastifyPluginAsync, FastifyRequest } from 'fastify';
import { z } from 'zod';
import prisma from '../lib/prisma.js';
import { badRequest, notFound } from '../lib/errors.js';
import {
  appendToFolder,
  bulkDelete,
  bulkMove,
  copyMessage,
  createFolder,
  deleteFolder,
  deleteMessage,
  getAttachment,
  getMessage,
  globalSearch,
  listMailboxes,
  listMessages,
  markAllRead,
  moveMessage,
  renameFolder,
  sendMessage,
  setFlags,
} from '../lib/mail.js';
import { config } from '../config.js';

async function loadUserWithPassword(req: FastifyRequest) {
  const userId = req.userId!;
  const password = req.mailboxPassword!;
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error('User not found');
  return { ...user, password };
}

const listFoldersQuery = z.object({ refresh: z.coerce.boolean().optional() });

const listMessagesQuery = z.object({
  folder: z.string().default('INBOX'),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(25),
  search: z.string().optional(),
});

const globalSearchQuery = z.object({
  q: z.string().min(1),
  limit: z.coerce.number().int().min(1).max(100).default(50),
});

const uidParams = z.object({ uid: z.coerce.number().int() });
const folderParams = z.object({ folder: z.string() });

const flagsBody = z.object({
  add: z.array(z.string()).optional(),
  remove: z.array(z.string()).optional(),
});

const sendBody = z.object({
  to: z.array(z.string().email()).min(1),
  cc: z.array(z.string().email()).optional(),
  bcc: z.array(z.string().email()).optional(),
  subject: z.string().default(''),
  text: z.string().default(''),
  html: z.string().optional(),
  replyTo: z.string().email().optional(),
  inReplyTo: z.string().optional(),
  attachments: z.array(z.object({
    filename: z.string(),
    contentType: z.string(),
    content: z.string(),
  })).optional(),
});

const moveBody = z.object({ destFolder: z.string() });
const bulkBody = z.object({
  uids: z.array(z.number().int()),
  action: z.enum(['delete', 'move', 'read', 'unread']),
  destFolder: z.string().optional(),
});

const draftBody = z.object({
  to: z.array(z.string().email()).optional(),
  cc: z.array(z.string().email()).optional(),
  bcc: z.array(z.string().email()).optional(),
  subject: z.string().default(''),
  text: z.string().default(''),
});

const folderBody = z.object({ path: z.string() });
const renameBody = z.object({ newPath: z.string() });

export const mailRoutes: FastifyPluginAsync = async (app: FastifyInstance) => {
  app.get('/folders', async (req, reply) => {
    const q = listFoldersQuery.safeParse(req.query);
    if (!q.success) return badRequest(reply, 'Invalid query');
    const user = await loadUserWithPassword(req);
    const folders = await listMailboxes(user);
    return reply.send({ folders });
  });

  app.post('/folders', async (req, reply) => {
    const b = folderBody.safeParse(req.body);
    if (!b.success) return badRequest(reply, 'Invalid input');
    const user = await loadUserWithPassword(req);
    await createFolder(user, b.data.path);
    return reply.code(201).send({ ok: true });
  });

  app.patch('/folders/:path', async (req, reply) => {
    const path = decodeURIComponent((req.params as { path: string }).path);
    const b = renameBody.safeParse(req.body);
    if (!b.success) return badRequest(reply, 'Invalid input');
    const user = await loadUserWithPassword(req);
    await renameFolder(user, path, b.data.newPath);
    return reply.send({ ok: true });
  });

  app.delete('/folders/:path', async (req, reply) => {
    const path = decodeURIComponent((req.params as { path: string }).path);
    const user = await loadUserWithPassword(req);
    await deleteFolder(user, path);
    return reply.send({ ok: true });
  });

  app.get('/messages', async (req, reply) => {
    const q = listMessagesQuery.safeParse(req.query);
    if (!q.success) return badRequest(reply, q.error.issues[0]?.message ?? 'Invalid query');
    const user = await loadUserWithPassword(req);
    const { folder, page, pageSize, search } = q.data;
    const result = await listMessages(user, folder, { page, pageSize, search });
    return reply.send(result);
  });

  app.get('/search', async (req, reply) => {
    const q = globalSearchQuery.safeParse(req.query);
    if (!q.success) return badRequest(reply, 'Query param "q" is required');
    const user = await loadUserWithPassword(req);
    const result = await globalSearch(user, q.data.q, { limit: q.data.limit });
    return reply.send(result);
  });

  app.get('/messages/:uid', async (req, reply) => {
    const p = uidParams.safeParse(req.params);
    const q = folderParams.safeParse(req.query);
    if (!p.success || !q.success) return badRequest(reply, 'Invalid params');
    const user = await loadUserWithPassword(req);
    const msg = await getMessage(user, q.data.folder, p.data.uid);
    if (!msg) return notFound(reply, 'Message not found');
    return reply.send({ message: msg });
  });

  app.get('/messages/:uid/attachment', async (req, reply) => {
    const p = uidParams.safeParse(req.params);
    const q = z.object({ folder: z.string(), part: z.string() }).safeParse(req.query);
    if (!p.success || !q.success) return badRequest(reply, 'Invalid params');
    const user = await loadUserWithPassword(req);
    const att = await getAttachment(user, q.data.folder, p.data.uid, q.data.part);
    if (!att) return notFound(reply, 'Attachment not found');
    reply.header('Content-Type', att.contentType);
    reply.header('Content-Disposition', `attachment; filename="${att.filename.replace(/"/g, '')}"`);
    return reply.send(att.content);
  });

  app.post('/messages/:uid/flags', async (req, reply) => {
    const p = uidParams.safeParse(req.params);
    const q = folderParams.safeParse(req.query);
    const b = flagsBody.safeParse(req.body);
    if (!p.success || !q.success || !b.success) return badRequest(reply, 'Invalid input');
    const user = await loadUserWithPassword(req);
    await setFlags(user, q.data.folder, p.data.uid, b.data);
    return reply.send({ ok: true });
  });

  app.post('/messages/:uid/move', async (req, reply) => {
    const p = uidParams.safeParse(req.params);
    const q = folderParams.safeParse(req.query);
    const b = moveBody.safeParse(req.body);
    if (!p.success || !q.success || !b.success) return badRequest(reply, 'Invalid input');
    const user = await loadUserWithPassword(req);
    await moveMessage(user, q.data.folder, p.data.uid, b.data.destFolder);
    return reply.send({ ok: true });
  });

  app.post('/messages/:uid/copy', async (req, reply) => {
    const p = uidParams.safeParse(req.params);
    const q = folderParams.safeParse(req.query);
    const b = moveBody.safeParse(req.body);
    if (!p.success || !q.success || !b.success) return badRequest(reply, 'Invalid input');
    const user = await loadUserWithPassword(req);
    await copyMessage(user, q.data.folder, p.data.uid, b.data.destFolder);
    return reply.send({ ok: true });
  });

  app.delete('/messages/:uid', async (req, reply) => {
    const p = uidParams.safeParse(req.params);
    const q = folderParams.safeParse(req.query);
    if (!p.success || !q.success) return badRequest(reply, 'Invalid params');
    const user = await loadUserWithPassword(req);
    await deleteMessage(user, q.data.folder, p.data.uid);
    return reply.send({ ok: true });
  });

  app.post('/bulk', async (req, reply) => {
    const q = folderParams.safeParse(req.query);
    const b = bulkBody.safeParse(req.body);
    if (!q.success || !b.success) return badRequest(reply, 'Invalid input');
    const user = await loadUserWithPassword(req);
    const { uids, action, destFolder } = b.data;
    if (action === 'delete') await bulkDelete(user, q.data.folder, uids);
    else if (action === 'move') {
      if (!destFolder) return badRequest(reply, 'destFolder required for move');
      await bulkMove(user, q.data.folder, uids, destFolder);
    } else if (action === 'read' || action === 'unread') {
      const flag = '\\Seen';
      for (const uid of uids) {
        await setFlags(user, q.data.folder, uid, action === 'read' ? { add: [flag] } : { remove: [flag] });
      }
    }
    return reply.send({ ok: true });
  });

  app.post('/mark-all-read', async (req, reply) => {
    const q = folderParams.safeParse(req.query);
    if (!q.success) return badRequest(reply, 'folder required');
    const user = await loadUserWithPassword(req);
    await markAllRead(user, q.data.folder);
    return reply.send({ ok: true });
  });

  app.post('/drafts', async (req, reply) => {
    const b = draftBody.safeParse(req.body);
    if (!b.success) return badRequest(reply, 'Invalid input');
    const user = await loadUserWithPassword(req);
    const raw = [
      `From: ${user.email}`,
      `To: ${b.data.to?.join(', ') ?? ''}`,
      `Cc: ${b.data.cc?.join(', ') ?? ''}`,
      `Subject: ${b.data.subject}`,
      'Content-Type: text/plain; charset=utf-8',
      '',
      b.data.text,
    ].join('\r\n');
    const draftsFolder = await findSpecialFolder(user, '\\Drafts');
    await appendToFolder(user, draftsFolder ?? 'Drafts', raw, ['\\Drafts', '\\Seen']);
    return reply.code(201).send({ ok: true });
  });

  app.post('/send', async (req, reply) => {
    const b = sendBody.safeParse(req.body);
    if (!b.success) return badRequest(reply, b.error.issues[0]?.message ?? 'Invalid input');
    const user = await loadUserWithPassword(req);
    const result = await sendMessage(user, {
      from: user.email,
      to: b.data.to,
      cc: b.data.cc,
      bcc: b.data.bcc,
      subject: b.data.subject,
      text: b.data.text,
      html: b.data.html,
      replyTo: b.data.replyTo,
      inReplyTo: b.data.inReplyTo,
      attachments: b.data.attachments?.map((a) => ({
        filename: a.filename,
        content: Buffer.from(a.content, 'base64'),
        contentType: a.contentType,
      })),
    });
    return reply.code(202).send(result);
  });
};

async function findSpecialFolder(user: { imapHost: string; imapPort: number; email: string; password: string }, specialUse: string): Promise<string | null> {
  const client = new (await import('imapflow')).ImapFlow({
    host: user.imapHost,
    port: user.imapPort,
    secure: user.imapPort === 993,
    auth: { user: user.email, pass: user.password },
    logger: false,
  });
  try {
    await client.connect();
    const list = await client.list();
    const found = (list ?? []).find((mb) => mb.specialUse === specialUse);
    return found?.path ?? null;
  } catch {
    return null;
  } finally {
    await client.logout().catch(() => undefined);
  }
}

export { config };
