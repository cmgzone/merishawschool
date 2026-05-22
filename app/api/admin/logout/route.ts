import { NextResponse, type NextRequest } from "next/server";
import { adminSessionCookieName, verifyAdminRequest } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  if (!verifyAdminRequest(request, { csrf: true })) {
    return NextResponse.json({ error: "Invalid admin session." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });

  response.cookies.set(adminSessionCookieName, "", {
    httpOnly: true,
    maxAge: 0,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
