import crypto from "node:crypto";
import type { NextRequest } from "next/server";

export const adminSessionCookieName = "merishaw_admin_session";
export const adminCsrfHeaderName = "x-admin-csrf";

const configuredAdminEmail = normalizeEmail(process.env.ADMIN_EMAIL);
const legacyAdminUsername = normalizeEmail(process.env.ADMIN_USERNAME);
const adminEmail =
  configuredAdminEmail || legacyAdminUsername || "admin@merishaw.local";
const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH?.trim() || undefined;
const legacyAdminPassword =
  process.env.ADMIN_PASSWORD || process.env.MERISHAW_ADMIN_PASSWORD;
const adminSessionSecret =
  process.env.ADMIN_SESSION_SECRET?.trim() || undefined;
const isProduction = process.env.NODE_ENV === "production";
const sessionSecret =
  adminSessionSecret ??
  (!isProduction ? (adminPasswordHash ?? legacyAdminPassword) : undefined);
const sessionMaxAgeSeconds = 60 * 60 * 8;
const loginWindowMs = 15 * 60 * 1000;
const maxIpLoginAttempts = 5;
const maxAccountLoginAttempts = 12;
const trustProxyHeaders = ["1", "true", "yes", "on"].includes(
  (process.env.ADMIN_TRUST_PROXY_HEADERS ?? "").toLowerCase(),
);

type AdminSessionPayload = {
  csrf: string;
  email?: string;
  exp: number;
  iat: number;
  nonce: string;
  username?: string;
};

type LoginAttempt = {
  count: number;
  resetAt: number;
};

const loginAttempts = new Map<string, LoginAttempt>();

function encode(value: string | Buffer) {
  return Buffer.from(value).toString("base64url");
}

function decode(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function sign(value: string, secret: string) {
  return crypto.createHmac("sha256", secret).update(value).digest("base64url");
}

function safeCompare(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  return (
    leftBuffer.length === rightBuffer.length &&
    crypto.timingSafeEqual(leftBuffer, rightBuffer)
  );
}

function normalizeEmail(value: string | undefined) {
  return value?.trim().toLowerCase() ?? "";
}

function getClientIp(request: NextRequest) {
  if (!trustProxyHeaders) {
    return "direct";
  }

  const cloudflare = request.headers.get("cf-connecting-ip")?.trim();
  const realIp = request.headers.get("x-real-ip")?.trim();
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();

  return (
    cloudflare ||
    realIp ||
    forwarded ||
    "unknown"
  );
}

function getLoginAttemptLimits(request: NextRequest, email: string) {
  const normalizedEmail = normalizeEmail(email) || "unknown";

  return [
    {
      key: `ip:${getClientIp(request)}:${normalizedEmail}`,
      maxAttempts: maxIpLoginAttempts,
    },
    {
      key: `account:${normalizedEmail}`,
      maxAttempts: maxAccountLoginAttempts,
    },
  ];
}

function parseScryptHash(value: string) {
  const [algorithm, n, r, p, salt, hash] = value.split("$");

  if (algorithm !== "scrypt" || !n || !r || !p || !salt || !hash) {
    return null;
  }

  return {
    hash,
    n: Number(n),
    p: Number(p),
    r: Number(r),
    salt,
  };
}

function verifyScryptPassword(password: string, storedHash: string) {
  const parsed = parseScryptHash(storedHash);

  if (!parsed || !Number.isFinite(parsed.n) || !Number.isFinite(parsed.r) || !Number.isFinite(parsed.p)) {
    return false;
  }

  const derivedKey = crypto.scryptSync(password, parsed.salt, 64, {
    N: parsed.n,
    p: parsed.p,
    r: parsed.r,
  });

  return safeCompare(derivedKey.toString("base64url"), parsed.hash);
}

function getSessionSecret(host?: string) {
  if (sessionSecret) {
    return sessionSecret;
  }

  if (host && canUseLocalDevAuth(host)) {
    return "merishaw-local-admin-session";
  }

  return null;
}

function readSessionPayload(token: string | undefined, host?: string) {
  if (!token) {
    return null;
  }

  const secret = getSessionSecret(host);

  if (!secret) {
    return null;
  }

  const [encodedPayload, signature] = token.split(".");

  if (!encodedPayload || !signature) {
    return null;
  }

  if (!safeCompare(signature, sign(encodedPayload, secret))) {
    return null;
  }

  try {
    const payload = JSON.parse(decode(encodedPayload)) as AdminSessionPayload;
    const now = Math.floor(Date.now() / 1000);

    if (
      typeof payload.exp !== "number" ||
      payload.exp <= now ||
      typeof payload.csrf !== "string" ||
      (typeof payload.email !== "string" &&
        typeof payload.username !== "string")
    ) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export function isAdminPasswordConfigured() {
  return Boolean(adminPasswordHash || legacyAdminPassword);
}

export function isAdminEmailConfigured() {
  return Boolean(configuredAdminEmail);
}

export function isUsingHashedAdminPassword() {
  return Boolean(adminPasswordHash);
}

export function isAdminSessionSecretConfigured() {
  return Boolean(adminSessionSecret);
}

export function isLocalHostValue(host: string) {
  const normalizedHost = host.trim().toLowerCase();

  return (
    normalizedHost === "localhost" ||
    normalizedHost.startsWith("localhost:") ||
    normalizedHost === "127.0.0.1" ||
    normalizedHost.startsWith("127.0.0.1:") ||
    normalizedHost === "::1" ||
    normalizedHost === "[::1]" ||
    normalizedHost.startsWith("[::1]:")
  );
}

export function canUseLocalDevAuth(host: string) {
  return !isProduction && !isAdminPasswordConfigured() && isLocalHostValue(host);
}

export function checkLoginRateLimit(request: NextRequest, email: string) {
  const now = Date.now();
  const limits = getLoginAttemptLimits(request, email);

  for (const limit of limits) {
    const current = loginAttempts.get(limit.key);

    if (
      current &&
      current.resetAt > now &&
      current.count >= limit.maxAttempts
    ) {
      return {
        allowed: false,
        retryAfterSeconds: Math.ceil((current.resetAt - now) / 1000),
      };
    }

    if (!current || current.resetAt <= now) {
      loginAttempts.set(limit.key, { count: 0, resetAt: now + loginWindowMs });
    }
  }

  return { allowed: true, retryAfterSeconds: 0 };
}

export function recordFailedLogin(request: NextRequest, email: string) {
  const now = Date.now();
  const limits = getLoginAttemptLimits(request, email);

  for (const limit of limits) {
    const current = loginAttempts.get(limit.key);

    if (!current || current.resetAt <= now) {
      loginAttempts.set(limit.key, { count: 1, resetAt: now + loginWindowMs });
      continue;
    }

    current.count += 1;
  }
}

export function clearLoginAttempts(request: NextRequest, email: string) {
  for (const limit of getLoginAttemptLimits(request, email)) {
    loginAttempts.delete(limit.key);
  }
}

export function createAdminSessionToken(host?: string) {
  const secret = getSessionSecret(host);

  if (!secret) {
    return null;
  }

  const now = Math.floor(Date.now() / 1000);
  const payload: AdminSessionPayload = {
    csrf: crypto.randomBytes(24).toString("base64url"),
    email: adminEmail,
    exp: now + sessionMaxAgeSeconds,
    iat: now,
    nonce: crypto.randomBytes(16).toString("base64url"),
  };
  const encodedPayload = encode(JSON.stringify(payload));

  return `${encodedPayload}.${sign(encodedPayload, secret)}`;
}

export function verifyAdminSessionToken(token: string | undefined, host?: string) {
  return Boolean(readSessionPayload(token, host));
}

export function getAdminSession(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const token = request.cookies.get(adminSessionCookieName)?.value;

  return readSessionPayload(token, host);
}

export function getAdminSessionFromToken(token: string | undefined, host?: string) {
  return readSessionPayload(token, host);
}

export function verifyAdminCredentials(email: string, password: string) {
  if (!safeCompare(normalizeEmail(email), adminEmail)) {
    return false;
  }

  if (adminPasswordHash) {
    return verifyScryptPassword(password, adminPasswordHash);
  }

  if (!legacyAdminPassword) {
    return false;
  }

  return safeCompare(password, legacyAdminPassword);
}

export function verifyCsrfToken(request: NextRequest) {
  const session = getAdminSession(request);
  const csrfToken = request.headers.get(adminCsrfHeaderName);

  return Boolean(session && csrfToken && safeCompare(csrfToken, session.csrf));
}

export function getAdminSessionCookieOptions() {
  return {
    httpOnly: true,
    maxAge: sessionMaxAgeSeconds,
    path: "/",
    priority: "high" as const,
    sameSite: "strict" as const,
    secure: isProduction,
  };
}

export function verifyAdminRequest(request: NextRequest, options?: { csrf?: boolean }) {
  const session = getAdminSession(request);

  if (!session) {
    return false;
  }

  if (options?.csrf) {
    return verifyCsrfToken(request);
  }

  return true;
}

export function createScryptPasswordHash(password: string) {
  const salt = crypto.randomBytes(16).toString("base64url");
  const n = 16384;
  const r = 8;
  const p = 1;
  const hash = crypto
    .scryptSync(password, salt, 64, { N: n, p, r })
    .toString("base64url");

  return `scrypt$${n}$${r}$${p}$${salt}$${hash}`;
}
