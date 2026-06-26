import 'dotenv/config';

function required(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;
  if (value === undefined || value === '') {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

function int(name: string, fallback: number): number {
  const raw = process.env[name];
  if (!raw) return fallback;
  const parsed = Number.parseInt(raw, 10);
  if (Number.isNaN(parsed)) throw new Error(`Env var ${name} must be an integer`);
  return parsed;
}

export const config = {
  port: int('PORT', 4000),
  host: process.env.HOST ?? '0.0.0.0',
  nodeEnv: process.env.NODE_ENV ?? 'development',
  jwtSecret: required('JWT_SECRET', 'dev-insecure-secret-change-me'),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '7d',
  databaseUrl: process.env.DATABASE_URL ?? 'file:./dev.db',
  mailcowApiUrl: required('MAILCOW_API_URL', 'https://mail.merishawschools.sc.ke'),
  mailcowApiKey: process.env.MAILCOW_API_KEY ?? '',
  defaultImapHost: process.env.DEFAULT_IMAP_HOST ?? 'mail.merishawschools.sc.ke',
  defaultImapPort: int('DEFAULT_IMAP_PORT', 993),
  defaultSmtpHost: process.env.DEFAULT_SMTP_HOST ?? 'mail.merishawschools.sc.ke',
  defaultSmtpPort: int('DEFAULT_SMTP_PORT', 587),
  allowedEmailDomain: process.env.ALLOWED_EMAIL_DOMAIN ?? 'merishawschools.sc.ke',
  corsOrigin: process.env.CORS_ORIGIN ?? '*',
} as const;

export type AppConfig = typeof config;
