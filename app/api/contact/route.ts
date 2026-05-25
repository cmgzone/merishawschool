import { NextResponse, type NextRequest } from "next/server";
import { siteConfig } from "@/data/site";
import { isSmtpConfigured, sendContactEmail } from "@/lib/smtp-mail";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type ContactRequestBody = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  subject?: unknown;
  message?: unknown;
  website?: unknown;
};

function cleanString(value: unknown, maxLength: number) {
  if (typeof value !== "string") {
    return "";
  }

  return value.replace(/\0/g, "").trim().slice(0, maxLength);
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function successResponse() {
  return NextResponse.json({
    ok: true,
    message: "Thank you. Your enquiry has been sent.",
  });
}

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as ContactRequestBody;
  const honeypot = cleanString(body.website, 80);

  if (honeypot) {
    return successResponse();
  }

  const name = cleanString(body.name, 120);
  const email = cleanString(body.email, 160);
  const phone = cleanString(body.phone, 60);
  const subject = cleanString(body.subject, 160).replace(/\s+/g, " ");
  const message = cleanString(body.message, 5000);

  if (!name || !email || !subject || !message) {
    return NextResponse.json(
      { error: "Please complete the required fields." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  if (!isSmtpConfigured(siteConfig.contact.email)) {
    return NextResponse.json(
      {
        error: `Email service is not configured yet. Please email ${siteConfig.contact.email} directly.`,
      },
      { status: 503 },
    );
  }

  try {
    await sendContactEmail(
      {
        name,
        email,
        phone,
        subject,
        message,
      },
      siteConfig.contact.email,
    );

    return successResponse();
  } catch (error) {
    console.error("Contact email send failed", error);

    return NextResponse.json(
      {
        error: `We could not send the enquiry right now. Please email ${siteConfig.contact.email} directly.`,
      },
      { status: 500 },
    );
  }
}
