import nodemailer from "nodemailer";

export type ContactEmailInput = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
};

type SmtpSettings = {
  host: string;
  port: number;
  secure: boolean;
  auth?: {
    user: string;
    pass: string;
  };
  from: string;
  to: string;
  sendConfirmation: boolean;
};

function getEnv(name: string) {
  return process.env[name]?.trim() ?? "";
}

function getBooleanEnv(name: string, fallback: boolean) {
  const value = getEnv(name).toLowerCase();

  if (["1", "true", "yes", "on"].includes(value)) {
    return true;
  }

  if (["0", "false", "no", "off"].includes(value)) {
    return false;
  }

  return fallback;
}

function getPort() {
  const value = Number(getEnv("SMTP_PORT") || "587");

  return Number.isFinite(value) ? value : 587;
}

function getSmtpSettings(defaultRecipient: string): SmtpSettings | null {
  const host = getEnv("SMTP_HOST");
  const port = getPort();
  const user = getEnv("SMTP_USER");
  const pass = getEnv("SMTP_PASS");
  const from = getEnv("SMTP_FROM") || user;
  const to = getEnv("CONTACT_EMAIL_TO") || defaultRecipient;
  const secure = getBooleanEnv("SMTP_SECURE", port === 465);
  const sendConfirmation = getBooleanEnv("CONTACT_SEND_CONFIRMATION", false);
  const hasPartialAuth = Boolean(user) !== Boolean(pass);

  if (!host || !from || !to || hasPartialAuth) {
    return null;
  }

  return {
    host,
    port,
    secure,
    auth: user && pass ? { user, pass } : undefined,
    from,
    to,
    sendConfirmation,
  };
}

export function isSmtpConfigured(defaultRecipient: string) {
  return Boolean(getSmtpSettings(defaultRecipient));
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatMessage(input: ContactEmailInput) {
  return [
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    input.phone ? `Phone: ${input.phone}` : null,
    `Subject: ${input.subject}`,
    "",
    input.message,
  ]
    .filter(Boolean)
    .join("\n");
}

function formatMessageHtml(input: ContactEmailInput) {
  const rows = [
    ["Name", input.name],
    ["Email", input.email],
    input.phone ? ["Phone", input.phone] : null,
    ["Subject", input.subject],
  ].filter(Boolean) as string[][];

  const details = rows
    .map(
      ([label, value]) =>
        `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</p>`,
    )
    .join("");
  const message = escapeHtml(input.message).replace(/\n/g, "<br />");

  return `${details}<hr /><p>${message}</p>`;
}

export async function sendContactEmail(
  input: ContactEmailInput,
  defaultRecipient: string,
) {
  const settings = getSmtpSettings(defaultRecipient);

  if (!settings) {
    throw new Error("SMTP is not configured.");
  }

  const transporter = nodemailer.createTransport({
    host: settings.host,
    port: settings.port,
    secure: settings.secure,
    auth: settings.auth,
  });
  const subject = `Website enquiry: ${input.subject}`;

  await transporter.sendMail({
    from: settings.from,
    to: settings.to,
    replyTo: input.email,
    subject,
    text: formatMessage(input),
    html: formatMessageHtml(input),
  });

  if (settings.sendConfirmation) {
    await transporter.sendMail({
      from: settings.from,
      to: input.email,
      replyTo: settings.to,
      subject: "Merishaw School received your enquiry",
      text:
        "Thank you for contacting Merishaw School. We have received your enquiry and our team will respond soon.",
      html:
        "<p>Thank you for contacting Merishaw School. We have received your enquiry and our team will respond soon.</p>",
    });
  }
}
