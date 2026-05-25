import { NextResponse, type NextRequest } from "next/server";
import {
  adminSessionCookieName,
  canUseLocalDevAuth,
  checkLoginRateLimit,
  clearLoginAttempts,
  createAdminSessionToken,
  getAdminSessionCookieOptions,
  isAdminEmailConfigured,
  isAdminPasswordConfigured,
  isAdminSessionSecretConfigured,
  recordFailedLogin,
  verifyAdminCredentials,
} from "@/lib/admin-auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function getString(value: unknown) {
  return typeof value === "string" ? value : "";
}

export async function POST(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const body = (await request.json().catch(() => ({}))) as {
    email?: unknown;
    password?: unknown;
    username?: unknown;
  };
  const email = getString(body.email) || getString(body.username);
  const password = getString(body.password);
  const localDevAuth = canUseLocalDevAuth(host);
  const rateLimit = checkLoginRateLimit(request, email);

  if (process.env.NODE_ENV === "production" && !isAdminEmailConfigured()) {
    return NextResponse.json(
      { error: "Set ADMIN_EMAIL before using admin login." },
      { status: 503 },
    );
  }

  if (
    process.env.NODE_ENV === "production" &&
    !isAdminSessionSecretConfigured()
  ) {
    return NextResponse.json(
      { error: "Set ADMIN_SESSION_SECRET before using admin login." },
      { status: 503 },
    );
  }

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        error: `Too many login attempts. Try again in ${rateLimit.retryAfterSeconds} seconds.`,
      },
      {
        headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
        status: 429,
      },
    );
  }

  const passwordMatches = isAdminPasswordConfigured()
    ? verifyAdminCredentials(email, password)
    : localDevAuth;

  if (!passwordMatches) {
    recordFailedLogin(request, email);

    return NextResponse.json(
      {
        error: isAdminPasswordConfigured()
          ? "Invalid admin email or password."
          : "Set ADMIN_PASSWORD_HASH to enable admin login.",
      },
      { status: isAdminPasswordConfigured() ? 401 : 503 },
    );
  }

  clearLoginAttempts(request, email);

  const sessionToken = createAdminSessionToken(host);

  if (!sessionToken) {
    return NextResponse.json(
      { error: "Admin session could not be created." },
      { status: 503 },
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(
    adminSessionCookieName,
    sessionToken,
    getAdminSessionCookieOptions(),
  );

  return response;
}
