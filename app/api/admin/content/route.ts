import { NextResponse, type NextRequest } from "next/server";
import {
  getEditableContent,
  normalizeEditableContent,
  writeEditableContent,
} from "@/data/admin-content";
import { isAdminPasswordConfigured, verifyAdminRequest } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  if (!verifyAdminRequest(request)) {
    return NextResponse.json(
      {
        error: isAdminPasswordConfigured()
          ? "Admin login required."
          : "Set ADMIN_PASSWORD_HASH before using admin APIs on a public host.",
      },
      { status: 401 },
    );
  }

  const content = await getEditableContent();

  return NextResponse.json({
    content,
    authRequired: isAdminPasswordConfigured(),
  });
}

export async function PUT(request: NextRequest) {
  if (!verifyAdminRequest(request, { csrf: true })) {
    return NextResponse.json(
      {
        error: isAdminPasswordConfigured()
          ? "Admin session or CSRF token is invalid."
          : "Set ADMIN_PASSWORD_HASH before saving content on a public host.",
      },
      { status: 401 },
    );
  }

  const body = (await request.json()) as unknown;
  const content = normalizeEditableContent(body);
  const savedContent = await writeEditableContent(content);

  return NextResponse.json({ content: savedContent });
}
