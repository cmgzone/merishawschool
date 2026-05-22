import { NextResponse, type NextRequest } from "next/server";
import {
  adminSessionCookieName,
  canUseLocalDevAuth,
  checkLoginRateLimit,
  clearLoginAttempts,
  createAdminSessionToken,
  getAdminSessionCookieOptions,
  isAdminPasswordConfigured,
  recordFailedLogin,
  verifyAdminCredentials,
} from "@/lib/admin-auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const body = (await request.json().catch(() => ({}))) as {
    password?: string;
    username?: string;
  };
  const password = body.password ?? "";
  const username = body.username ?? "admin";
  const localDevAuth = canUseLocalDevAuth(host);
  const rateLimit = checkLoginRateLimit(request, username);

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
    ? verifyAdminCredentials(username, password)
    : localDevAuth;

  if (!passwordMatches) {
    recordFailedLogin(request, username);

    return NextResponse.json(
      {
        error: isAdminPasswordConfigured()
          ? "Invalid admin password."
          : "Set ADMIN_PASSWORD to enable admin login.",
      },
      { status: isAdminPasswordConfigured() ? 401 : 503 },
    );
  }

  clearLoginAttempts(request, username);

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
