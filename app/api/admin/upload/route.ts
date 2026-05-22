import { NextResponse, type NextRequest } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import { isAdminPasswordConfigured, verifyAdminRequest } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const maxUploadBytes = 8 * 1024 * 1024;
const allowedTypes = new Set([
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/webp",
]);

const imageSignatures = [
  {
    extension: ".jpg",
    mime: "image/jpeg",
    matches: (bytes: Buffer) =>
      bytes.length > 3 &&
      bytes[0] === 0xff &&
      bytes[1] === 0xd8 &&
      bytes[2] === 0xff,
  },
  {
    extension: ".jpeg",
    mime: "image/jpeg",
    matches: (bytes: Buffer) =>
      bytes.length > 3 &&
      bytes[0] === 0xff &&
      bytes[1] === 0xd8 &&
      bytes[2] === 0xff,
  },
  {
    extension: ".png",
    mime: "image/png",
    matches: (bytes: Buffer) =>
      bytes.length > 8 &&
      bytes[0] === 0x89 &&
      bytes[1] === 0x50 &&
      bytes[2] === 0x4e &&
      bytes[3] === 0x47,
  },
  {
    extension: ".gif",
    mime: "image/gif",
    matches: (bytes: Buffer) =>
      bytes.length > 6 &&
      bytes.subarray(0, 3).toString("ascii") === "GIF",
  },
  {
    extension: ".webp",
    mime: "image/webp",
    matches: (bytes: Buffer) =>
      bytes.length > 12 &&
      bytes.subarray(0, 4).toString("ascii") === "RIFF" &&
      bytes.subarray(8, 12).toString("ascii") === "WEBP",
  },
];

function safeFileName(name: string) {
  const extension = path.extname(name).toLowerCase();
  const baseName = path
    .basename(name, extension)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);

  return `${baseName || "image"}-${Date.now()}${extension}`;
}

export async function POST(request: NextRequest) {
  if (!verifyAdminRequest(request, { csrf: true })) {
    return NextResponse.json(
      {
        error: isAdminPasswordConfigured()
          ? "Admin session or CSRF token is invalid."
          : "Set ADMIN_PASSWORD before uploading images on a public host.",
      },
      { status: 401 },
    );
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No image file was provided." }, { status: 400 });
  }

  if (!allowedTypes.has(file.type)) {
    return NextResponse.json(
      { error: "Upload a JPG, PNG, WebP, or GIF image." },
      { status: 400 },
    );
  }

  if (file.size > maxUploadBytes) {
    return NextResponse.json(
      { error: "Image must be smaller than 8MB." },
      { status: 400 },
    );
  }

  const uploadDir = path.join(process.cwd(), "public", "uploads");
  const bytes = Buffer.from(await file.arrayBuffer());
  const signature = imageSignatures.find(
    (item) => item.mime === file.type && item.matches(bytes),
  );

  if (!signature) {
    return NextResponse.json(
      { error: "The uploaded file does not match a valid image signature." },
      { status: 400 },
    );
  }

  const originalExtension = path.extname(file.name).toLowerCase();
  const safeName = originalExtension === signature.extension
    ? file.name
    : `${path.basename(file.name, originalExtension)}${signature.extension}`;
  const fileName = safeFileName(safeName);

  await fs.mkdir(uploadDir, { recursive: true });
  await fs.writeFile(path.join(uploadDir, fileName), bytes);

  return NextResponse.json({ url: `/uploads/${fileName}` });
}
