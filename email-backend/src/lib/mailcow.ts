import { config } from '../config.js';
import { AppError } from './errors.js';

const BASE = config.mailcowApiUrl.replace(/\/$/, '');
const API_KEY = config.mailcowApiKey;

async function mailcow<T>(path: string, init: RequestInit = {}): Promise<T> {
  if (!API_KEY) throw new AppError('Mailcow API key not configured', 500, 'Server Misconfiguration');
  const url = `${BASE}/api/v1${path}`;
  const res = await fetch(url, {
    ...init,
    headers: {
      'X-API-Key': API_KEY,
      'Content-Type': 'application/json',
      ...(init.headers ?? {}),
    },
  });
  const text = await res.text();
  let body: unknown = null;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    body = text;
  }
  if (!res.ok) {
    throw new AppError(
      typeof body === 'string' ? body : `Mailcow API error (${res.status})`,
      res.status === 404 ? 404 : 502,
      'Upstream Error'
    );
  }
  return body as T;
}

export interface MailcowDomain {
  domain_name: string;
  aliases: number;
  mailboxes: number;
  active: string | number;
  backupmx: string | number;
  relay_all_recipients: string | number;
}

export interface MailcowMailbox {
  username: string;
  name: string;
  quota: number;
  active: string | number;
  domain: string;
  local_part: string;
  messages: number;
  used: number;
}

export interface MailcowAlias {
  id: number;
  address: string;
  goto: string;
  active: string | number;
  domain: string;
}

// mailcow GET endpoints return arrays under /[item]/all, single under /[item]/[id]
export async function listDomains(): Promise<MailcowDomain[]> {
  return mailcow<MailcowDomain[]>('/get/domain/all');
}

export async function getDomain(name: string): Promise<MailcowDomain[]> {
  return mailcow<MailcowDomain[]>(`/get/domain/${encodeURIComponent(name)}`);
}

export async function createDomain(input: {
  domain: string;
  description?: string;
  aliases?: number;
  mailboxes?: number;
  quota?: number;
  active?: boolean;
}): Promise<unknown> {
  return mailcow('/add/domain', {
    method: 'POST',
    body: JSON.stringify([
      {
        domain: input.domain,
        description: input.description ?? '',
        aliases: input.aliases ?? 400,
        mailboxes: input.mailboxes ?? 10,
        quota: input.quota ?? 10240,
        active: input.active ? '1' : '0',
      },
    ]),
  });
}

export async function deleteDomain(domain: string): Promise<unknown> {
  return mailcow('/delete/domain', {
    method: 'POST',
    body: JSON.stringify([domain]),
  });
}

export async function listMailboxes(): Promise<MailcowMailbox[]> {
  return mailcow<MailcowMailbox[]>('/get/mailbox/all');
}

export async function getMailbox(username: string): Promise<MailcowMailbox[]> {
  return mailcow<MailcowMailbox[]>(`/get/mailbox/${encodeURIComponent(username)}`);
}

export interface CreateMailboxInput {
  localPart: string;
  domain: string;
  name: string;
  password: string;
  quota?: number;
  active?: boolean;
}

export async function createMailbox(input: CreateMailboxInput): Promise<unknown> {
  return mailcow('/add/mailbox', {
    method: 'POST',
    body: JSON.stringify([
      {
        local_part: input.localPart,
        domain: input.domain,
        name: input.name,
        password: input.password,
        password2: input.password,
        quota: input.quota ?? 1024,
        active: input.active === false ? '0' : '1',
      },
    ]),
  });
}

export async function deleteMailbox(username: string): Promise<unknown> {
  return mailcow('/delete/mailbox', {
    method: 'POST',
    body: JSON.stringify([username]),
  });

}

export async function updateMailboxPassword(username: string, newPassword: string): Promise<unknown> {
  return mailcow('/edit/mailbox', {
    method: 'POST',
    body: JSON.stringify({
      items: [username],
      attr: { password: newPassword, password2: newPassword },
    }),
  });
}

export async function updateMailboxActive(username: string, active: boolean): Promise<unknown> {
  return mailcow('/edit/mailbox', {
    method: 'POST',
    body: JSON.stringify({
      items: [username],
      attr: { active: active ? '1' : '0' },
    }),
  });
}

export async function listAliases(): Promise<MailcowAlias[]> {
  return mailcow<MailcowAlias[]>('/get/alias/all');
}

export async function createAlias(address: string, goto: string, active = true): Promise<unknown> {
  return mailcow('/add/alias', {
    method: 'POST',
    body: JSON.stringify([
      { address, goto, active: active ? '1' : '0' },
    ]),
  });
}

export async function deleteAlias(id: number): Promise<unknown> {
  return mailcow('/delete/alias', {
    method: 'POST',
    body: JSON.stringify([id]),
  });
}
