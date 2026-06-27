import { ImapFlow, type MailboxObject } from 'imapflow';
import { simpleParser } from 'mailparser';
import nodemailer from 'nodemailer';
import { randomBytes } from 'node:crypto';
import type { User } from '@prisma/client';
import { AppError } from './errors.js';

export interface MailboxInfo {
  path: string;
  name: string;
  specialUse: string | null;
  status: { messages: number; unseen: number };
}

export interface MessageSummary {
  uid: number;
  seq: number;
  flags: string[];
  internalDate: string | null;
  from: string | null;
  to: string | null;
  subject: string | null;
  snippet: string | null;
  hasAttachments: boolean;
  size: number;
  threadId: string | null;
}

export interface AttachmentInfo {
  partId: string;
  filename: string | null;
  contentType: string;
  size: number;
  cid: string | null;
  inline: boolean;
}

export interface MessageDetail extends MessageSummary {
  html: string | null;
  text: string | null;
  headers: Record<string, string>;
  attachments: AttachmentInfo[];
  inReplyTo: string | null;
  messageId: string | null;
  references: string | null;
}

function isoDate(value: unknown): string | null {
  if (value instanceof Date) return value.toISOString();
  if (typeof value === 'string') {
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? null : d.toISOString();
  }
  return null;
}

interface ImapAddress {
  address?: string;
  name?: string;
}

function addressText(addr: unknown): string | null {
  if (!addr) return null;
  const arr = Array.isArray(addr) ? addr : [addr];
  const parts = arr
    .map((a) => {
      const addr = (a as ImapAddress) ?? {};
      if (addr.name && addr.address) return `${addr.name} <${addr.address}>`;
      return addr.address ?? '';
    })
    .filter(Boolean);
  return parts.length ? parts.join(', ') : null;
}

interface MailparserAddressObject {
  text?: string;
  value?: { address?: string; name?: string }[];
}

function mailparserAddressText(addr: MailparserAddressObject | MailparserAddressObject[] | undefined): string | null {
  if (!addr) return null;
  const arr = Array.isArray(addr) ? addr : [addr];
  for (const a of arr) {
    if (a?.text) return a.text;
    if (a?.value?.length) {
      const joined = a.value.map((v) => (v.name && v.address ? `${v.name} <${v.address}>` : v.address ?? '')).filter(Boolean).join(', ');
      if (joined) return joined;
    }
  }
  return null;
}

function headerValue(v: unknown): string {
  if (v instanceof Date) return v.toISOString();
  if (typeof v === 'string') return v;
  if (Array.isArray(v)) return v.map((x) => headerValue(x)).join(', ');
  if (v && typeof v === 'object' && 'text' in v && typeof (v as { text: unknown }).text === 'string') return (v as { text: string }).text;
  return String(v ?? '');
}

function imapClient(user: { imapHost: string; imapPort: number; email: string; password: string }) {
  return new ImapFlow({
    host: user.imapHost,
    port: user.imapPort,
    secure: user.imapPort === 993,
    auth: { user: user.email, pass: user.password },
    logger: false,
  });
}

export async function listMailboxes(user: User & { password: string }): Promise<MailboxInfo[]> {
  const client = imapClient(user);
  try {
    await client.connect();
    const lock = await client.getMailboxLock('INBOX');
    try {
      const list = await client.list();
      const out: MailboxInfo[] = [];
      for (const mb of list ?? []) {
        const status = await client.status(mb.path, { messages: true, unseen: true });
        out.push({
          path: mb.path,
          name: mb.name,
          specialUse: mb.specialUse ?? null,
          status: { messages: status?.messages ?? 0, unseen: status?.unseen ?? 0 },
        });
      }
      return out;
    } finally {
      lock.release();
    }
  } finally {
    await client.logout().catch(() => undefined);
  }
}

export async function listMessages(
  user: User & { password: string },
  folder: string,
  opts: { page: number; pageSize: number; search?: string }
): Promise<{ messages: MessageSummary[]; total: number }> {
  const client = imapClient(user);
  try {
    await client.connect();
    const lock = await client.getMailboxLock(folder || 'INBOX');
    const messages: MessageSummary[] = [];
    try {
      const rangeStart = Math.max(1, (opts.page - 1) * opts.pageSize + 1);
      const mailboxInfo = client.mailbox as MailboxObject | false;
      const total = typeof mailboxInfo === 'object' && mailboxInfo ? mailboxInfo.exists ?? 0 : 0;
      if (total === 0) return { messages: [], total: 0 };

      const start = Math.max(1, total - rangeStart - opts.pageSize + 2);
      const end = Math.max(1, total - rangeStart + 1);
      const range = `${start}:${end}`;

      const searchCriteria = opts.search
        ? { seq: range, search: opts.search }
        : { seq: range };

      for await (const msg of client.fetch(searchCriteria, {
        uid: true,
        flags: true,
        internalDate: true,
        envelope: true,
        bodyStructure: true,
        size: true,
        headers: true,
        source: true,
      })) {
        const env = msg.envelope;
        const parsed = await simpleParser(msg.source as Buffer, { keepCidLinks: true });
        const textBody = parsed.text ?? '';
        messages.push({
          uid: msg.uid,
          seq: msg.seq,
          flags: Array.isArray(msg.flags) ? (msg.flags as string[]).map((f) => String(f)) : [],
          internalDate: isoDate(msg.internalDate),
          from: addressText(env?.from as unknown) ?? mailparserAddressText(parsed.from) ?? null,
          to: addressText(env?.to as unknown) ?? mailparserAddressText(parsed.to) ?? null,
          subject: env?.subject ?? parsed.subject ?? null,
          snippet: textBody.slice(0, 160).replace(/\s+/g, ' ').trim(),
          hasAttachments: Boolean(parsed.attachments?.length),
          size: msg.size ?? 0,
          threadId: parsed.messageId ?? parsed.inReplyTo ?? null,
        });
      }
      // newest first
      messages.sort((a, b) => b.seq - a.seq);
      return { messages, total };
    } finally {
      lock.release();
    }
  } finally {
    await client.logout().catch(() => undefined);
  }
}

export interface GlobalSearchResult {
  messages: (MessageSummary & { folder: string })[];
  total: number;
}

export async function globalSearch(
  user: User & { password: string },
  query: string,
  opts: { limit?: number } = {}
): Promise<GlobalSearchResult> {
  const limit = opts.limit ?? 50;
  const client = imapClient(user);
  const results: (MessageSummary & { folder: string })[] = [];
  try {
    await client.connect();
    const mailboxes = await client.list();
    for (const mb of mailboxes ?? []) {
      if (results.length >= limit) break;
      const lock = await client.getMailboxLock(mb.path);
      try {
        const uids = await client.search({ body: query }, { uid: true });
        if (!Array.isArray(uids) || !uids.length) continue;
        const toFetch = uids.slice(-limit);
        for await (const msg of client.fetch(toFetch.join(','), {
          uid: true,
          flags: true,
          internalDate: true,
          envelope: true,
          size: true,
          source: true,
        }, { uid: true })) {
          if (results.length >= limit) break;
          const env = msg.envelope;
          const parsed = await simpleParser(msg.source as Buffer);
          results.push({
            uid: msg.uid,
            seq: msg.seq,
            flags: Array.isArray(msg.flags) ? (msg.flags as string[]).map((f) => String(f)) : [],
            internalDate: isoDate(msg.internalDate),
            from: addressText(env?.from as unknown) ?? mailparserAddressText(parsed.from) ?? null,
            to: addressText(env?.to as unknown) ?? mailparserAddressText(parsed.to) ?? null,
            subject: env?.subject ?? parsed.subject ?? null,
            snippet: (parsed.text ?? '').slice(0, 160).replace(/\s+/g, ' ').trim(),
            hasAttachments: Boolean(parsed.attachments?.length),
            size: msg.size ?? 0,
            threadId: parsed.messageId ?? parsed.inReplyTo ?? null,
            folder: mb.path,
          });
        }
      } finally {
        lock.release();
      }
    }
  } finally {
    await client.logout().catch(() => undefined);
  }
  results.sort((a, b) => (b.internalDate ?? '').localeCompare(a.internalDate ?? ''));
  return { messages: results, total: results.length };
}

export async function getMessage(
  user: User & { password: string },
  folder: string,
  uid: number
): Promise<MessageDetail | null> {
  const client = imapClient(user);
  try {
    await client.connect();
    const lock = await client.getMailboxLock(folder || 'INBOX');
    try {
      const fetched = await client.fetchOne(String(uid), { uid: true, flags: true, internalDate: true, envelope: true, source: true, size: true }, { uid: true });
      if (!fetched) return null;
      const parsed = await simpleParser(fetched.source as Buffer);
      const headers: Record<string, string> = {};
      for (const [k, v] of parsed.headers.entries()) {
        headers[k] = headerValue(v);
      }
      return {
        uid: fetched.uid,
        seq: fetched.seq,
        flags: Array.isArray(fetched.flags) ? (fetched.flags as string[]).map((f) => String(f)) : [],
        internalDate: isoDate(fetched.internalDate),
        from: mailparserAddressText(parsed.from) ?? null,
        to: mailparserAddressText(parsed.to) ?? null,
        subject: parsed.subject ?? null,
        snippet: (parsed.text ?? '').slice(0, 160).replace(/\s+/g, ' ').trim(),
        hasAttachments: Boolean(parsed.attachments?.length),
        size: typeof fetched.size === 'number' ? fetched.size : 0,
        html: parsed.html === false ? null : (parsed.html ?? null),
        text: parsed.text ?? null,
        headers,
        attachments: (parsed.attachments ?? []).map((a) => ({
          partId: a.contentId ?? a.checksum ?? a.filename ?? 'part',
          filename: a.filename ?? null,
          contentType: a.contentType,
          size: a.content?.length ?? 0,
          cid: a.contentId ?? null,
          inline: Boolean((a as { inline?: boolean }).inline),
        })),
        inReplyTo: parsed.inReplyTo ?? null,
        messageId: parsed.messageId ?? null,
        references: Array.isArray(parsed.references) ? parsed.references.join(' ') : (parsed.references ?? null),
        threadId: parsed.messageId ?? parsed.inReplyTo ?? null,
      };
    } finally {
      lock.release();
    }
  } finally {
    await client.logout().catch(() => undefined);
  }
}

export async function setFlags(
  user: User & { password: string },
  folder: string,
  uid: number,
  flags: { add?: string[]; remove?: string[] }
): Promise<void> {
  const client = imapClient(user);
  try {
    await client.connect();
    const lock = await client.getMailboxLock(folder || 'INBOX');
    try {
      if (flags.add?.length) await client.messageFlagsAdd(String(uid), flags.add, { uid: true });
      if (flags.remove?.length) await client.messageFlagsRemove(String(uid), flags.remove, { uid: true });
    } finally {
      lock.release();
    }
  } finally {
    await client.logout().catch(() => undefined);
  }
}

export async function deleteMessage(user: User & { password: string }, folder: string, uid: number): Promise<void> {
  const client = imapClient(user);
  try {
    await client.connect();
    const lock = await client.getMailboxLock(folder || 'INBOX');
    try {
      await client.messageDelete(String(uid), { uid: true });
    } finally {
      lock.release();
    }
  } finally {
    await client.logout().catch(() => undefined);
  }
}

export async function getAttachment(
  user: User & { password: string },
  folder: string,
  uid: number,
  partId: string
): Promise<{ content: Buffer; filename: string; contentType: string } | null> {
  const client = imapClient(user);
  try {
    await client.connect();
    const lock = await client.getMailboxLock(folder || 'INBOX');
    try {
      const fetched = await client.fetchOne(
        String(uid),
        { uid: true, source: true, bodyStructure: true },
        { uid: true }
      );
      if (!fetched) return null;
      const parsed = await simpleParser(fetched.source as Buffer);
      const att = (parsed.attachments ?? []).find((a) => a.contentId === partId || a.checksum === partId || a.filename === partId);
      if (!att) return null;
      return {
        content: att.content,
        filename: att.filename ?? 'attachment',
        contentType: att.contentType,
      };
    } finally {
      lock.release();
    }
  } finally {
    await client.logout().catch(() => undefined);
  }
}

export async function moveMessage(
  user: User & { password: string },
  folder: string,
  uid: number,
  destFolder: string
): Promise<void> {
  const client = imapClient(user);
  try {
    await client.connect();
    const lock = await client.getMailboxLock(folder || 'INBOX');
    try {
      await client.messageMove(String(uid), destFolder, { uid: true });
    } finally {
      lock.release();
    }
  } finally {
    await client.logout().catch(() => undefined);
  }
}

export async function copyMessage(
  user: User & { password: string },
  folder: string,
  uid: number,
  destFolder: string
): Promise<void> {
  const client = imapClient(user);
  try {
    await client.connect();
    const lock = await client.getMailboxLock(folder || 'INBOX');
    try {
      await client.messageCopy(String(uid), destFolder, { uid: true });
    } finally {
      lock.release();
    }
  } finally {
    await client.logout().catch(() => undefined);
  }
}

export async function appendToFolder(
  user: User & { password: string },
  folder: string,
  rawMessage: string | Buffer,
  flags: string[] = ['\\Seen']
): Promise<void> {
  const client = imapClient(user);
  try {
    await client.connect();
    await client.append(folder, rawMessage, flags);
  } finally {
    await client.logout().catch(() => undefined);
  }
}

export async function markAllRead(user: User & { password: string }, folder: string): Promise<void> {
  const client = imapClient(user);
  try {
    await client.connect();
    const lock = await client.getMailboxLock(folder || 'INBOX');
    try {
      await client.messageFlagsAdd('1:*', ['\\Seen']);
    } finally {
      lock.release();
    }
  } finally {
    await client.logout().catch(() => undefined);
  }
}

export async function bulkDelete(
  user: User & { password: string },
  folder: string,
  uids: number[]
): Promise<void> {
  const client = imapClient(user);
  try {
    await client.connect();
    const lock = await client.getMailboxLock(folder || 'INBOX');
    try {
      for (const uid of uids) {
        await client.messageDelete(String(uid), { uid: true });
      }
    } finally {
      lock.release();
    }
  } finally {
    await client.logout().catch(() => undefined);
  }
}

export async function bulkMove(
  user: User & { password: string },
  folder: string,
  uids: number[],
  destFolder: string
): Promise<void> {
  const client = imapClient(user);
  try {
    await client.connect();
    const lock = await client.getMailboxLock(folder || 'INBOX');
    try {
      for (const uid of uids) {
        await client.messageMove(String(uid), destFolder, { uid: true });
      }
    } finally {
      lock.release();
    }
  } finally {
    await client.logout().catch(() => undefined);
  }
}

export async function createFolder(
  user: User & { password: string },
  path: string
): Promise<void> {
  const client = imapClient(user);
  try {
    await client.connect();
    await client.mailboxCreate(path);
  } finally {
    await client.logout().catch(() => undefined);
  }
}

export async function renameFolder(
  user: User & { password: string },
  path: string,
  newPath: string
): Promise<void> {
  const client = imapClient(user);
  try {
    await client.connect();
    await client.mailboxRename(path, newPath);
  } finally {
    await client.logout().catch(() => undefined);
  }
}

export async function deleteFolder(
  user: User & { password: string },
  path: string
): Promise<void> {
  const client = imapClient(user);
  try {
    await client.connect();
    await client.mailboxDelete(path);
  } finally {
    await client.logout().catch(() => undefined);
  }
}

export interface SendMessageInput {
  from: string;
  to: string[];
  cc?: string[];
  bcc?: string[];
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
  inReplyTo?: string;
  attachments?: { filename: string; content: Buffer; contentType: string }[];
}

export interface SendMessageResult {
  messageId: string | null;
  accepted: string[];
  rejected: string[];
  response: string | null;
  sentFolderSaved: boolean;
  sentFolder: string | null;
}

async function findSpecialFolderPath(user: User & { password: string }, specialUse: string): Promise<string | null> {
  const client = imapClient(user);
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

function stringList(value: unknown): string[] {
  return Array.isArray(value) ? value.map((item) => String(item)).filter(Boolean) : [];
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function textToHtml(text: string): string {
  const body = escapeHtml(text || ' ')
    .split(/\r?\n/)
    .map((line) => line || '&nbsp;')
    .join('<br>\n');
  return `<div style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 1.5;">${body}</div>`;
}

function senderName(user: User): string {
  const displayName = user.displayName?.trim();
  if (displayName) return displayName;
  const localPart = user.email.split('@')[0]?.trim();
  return localPart || 'Merishaw School';
}

function cleanAddress(value: string): string {
  return value.trim().toLowerCase();
}

function uniqueAddresses(values: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const value of values) {
    const address = cleanAddress(value);
    if (!address || seen.has(address)) continue;
    seen.add(address);
    out.push(address);
  }
  return out;
}

function messageDomain(address: string): string {
  return address.split('@')[1]?.trim().toLowerCase() || 'merishawschools.sc.ke';
}

function smtpClientName(user: User): string {
  return process.env.SMTP_CLIENT_NAME?.trim() || (user.email.endsWith('@merishawschools.sc.ke') ? 'api.merishawschools.sc.ke' : user.smtpHost);
}

async function buildRawMessage(mailOptions: Record<string, unknown>): Promise<Buffer> {
  const streamTransport = nodemailer.createTransport({
    streamTransport: true,
    buffer: true,
    newline: 'windows',
  });
  const generated = await streamTransport.sendMail(mailOptions);
  const message = (generated as { message?: unknown }).message;
  if (Buffer.isBuffer(message)) return message;
  if (typeof message === 'string') return Buffer.from(message);
  throw new AppError('Could not create sent-mail copy', 500, 'Mail Build Failed');
}

export async function sendMessage(user: User & { password: string }, input: SendMessageInput): Promise<SendMessageResult> {
  const fromAddress = cleanAddress(input.from || user.email);
  const recipients = uniqueAddresses([...input.to, ...(input.cc ?? []), ...(input.bcc ?? [])]);
  if (recipients.length === 0) {
    throw new AppError('Add at least one recipient.', 400, 'Missing Recipient');
  }
  const fromName = senderName(user);
  const messageId = `<${randomBytes(16).toString('hex')}@${messageDomain(fromAddress)}>`;
  const replyTo = input.replyTo?.trim();
  const mailOptions = {
    envelope: { from: fromAddress, to: recipients },
    from: { name: fromName, address: fromAddress },
    to: uniqueAddresses(input.to),
    cc: input.cc?.length ? uniqueAddresses(input.cc) : undefined,
    bcc: input.bcc?.length ? uniqueAddresses(input.bcc) : undefined,
    subject: input.subject,
    text: input.text || ' ',
    html: input.html?.trim() ? input.html : undefined,
    replyTo: replyTo && cleanAddress(replyTo) !== fromAddress ? replyTo : undefined,
    inReplyTo: input.inReplyTo,
    messageId,
    date: new Date(),
    attachments: input.attachments?.map((a) => ({
      filename: a.filename,
      content: a.content,
      contentType: a.contentType,
    })),
  };
  const transport = nodemailer.createTransport({
    name: smtpClientName(user),
    host: user.smtpHost,
    port: user.smtpPort,
    secure: user.smtpPort === 465,
    requireTLS: user.smtpPort === 587,
    auth: { user: user.email, pass: user.password },
    tls: { servername: user.smtpHost },
  });
  const info = await transport.sendMail(mailOptions);
  const accepted = stringList(info.accepted);
  const rejected = stringList(info.rejected);
  if (accepted.length === 0) {
    const suffix = rejected.length ? ` Rejected: ${rejected.join(', ')}` : '';
    throw new AppError(`SMTP accepted 0 recipients.${suffix}`, 502, 'SMTP Delivery Failed');
  }

  let sentFolderSaved = false;
  let sentFolder: string | null = null;
  try {
    const raw = await buildRawMessage(mailOptions);
    sentFolder = await findSpecialFolderPath(user, '\\Sent');
    await appendToFolder(user, sentFolder ?? 'Sent', raw, ['\\Seen']);
    sentFolderSaved = true;
  } catch {
    sentFolderSaved = false;
  }

  return {
    messageId: info.messageId ?? messageId,
    accepted,
    rejected,
    response: typeof info.response === 'string' ? info.response : null,
    sentFolderSaved,
    sentFolder,
  };
}
