"use client";

import { FormEvent, useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { siteConfig } from "@/data/site";

type Status = "idle" | "error" | "ready";

type ContactSectionSite = {
  contact: typeof siteConfig.contact;
};

type ContactSectionIntro = {
  eyebrow: string;
  title: string;
  description: string;
};

type ContactSectionProps = {
  site?: ContactSectionSite;
  intro?: ContactSectionIntro;
};

const defaultIntro: ContactSectionIntro = {
  eyebrow: "Contact",
  title: "Speak with Merishaw School",
  description:
    "Reach the school for admissions, downloads, visits, sponsorship discussions, and general enquiries.",
};

export default function ContactSection({
  site = siteConfig,
  intro = defaultIntro,
}: ContactSectionProps) {
  const [status, setStatus] = useState<Status>("idle");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const subject = String(data.get("subject") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !email || !subject || !message) {
      setStatus("error");
      return;
    }

    setStatus("ready");
  }

  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p className="text-sm font-bold uppercase text-brand-burgundy">
            {intro.eyebrow}
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-brand-ink sm:text-4xl">
            {intro.title}
          </h2>
          <p className="mt-4 text-base leading-8 text-brand-muted">
            {intro.description}
          </p>

          <div className="mt-8 space-y-4">
            <a
              href={`tel:${site.contact.phonePrimary.replace(/\s/g, "")}`}
              className="flex gap-4 rounded-md border border-brand-line p-4 transition hover:border-brand-gold"
            >
              <Phone className="mt-1 h-5 w-5 shrink-0 text-brand-burgundy" />
              <span>
                <span className="block font-semibold text-brand-ink">Phone</span>
                <span className="text-sm text-brand-muted">
                  {site.contact.phonePrimary} / {site.contact.phoneSecondary}
                </span>
              </span>
            </a>
            <a
              href={`mailto:${site.contact.email}`}
              className="flex gap-4 rounded-md border border-brand-line p-4 transition hover:border-brand-gold"
            >
              <Mail className="mt-1 h-5 w-5 shrink-0 text-brand-burgundy" />
              <span>
                <span className="block font-semibold text-brand-ink">Email</span>
                <span className="text-sm text-brand-muted">
                  {site.contact.email}
                </span>
              </span>
            </a>
            <div className="flex gap-4 rounded-md border border-brand-line p-4">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-brand-burgundy" />
              <span>
                <span className="block font-semibold text-brand-ink">Location</span>
                <span className="text-sm text-brand-muted">
                  {site.contact.address}, {site.contact.postal}
                </span>
              </span>
            </div>
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-md border border-brand-line bg-brand-cream p-5 shadow-card sm:p-7"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold text-brand-ink">
              Your Name
              <input
                name="name"
                className="mt-2 w-full rounded-md border border-brand-line bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-burgundy focus:ring-2 focus:ring-brand-gold/40"
                autoComplete="name"
                required
              />
            </label>
            <label className="text-sm font-semibold text-brand-ink">
              Phone Number
              <input
                name="phone"
                className="mt-2 w-full rounded-md border border-brand-line bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-burgundy focus:ring-2 focus:ring-brand-gold/40"
                autoComplete="tel"
              />
            </label>
          </div>
          <label className="mt-4 block text-sm font-semibold text-brand-ink">
            Your Email
            <input
              name="email"
              type="email"
              className="mt-2 w-full rounded-md border border-brand-line bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-burgundy focus:ring-2 focus:ring-brand-gold/40"
              autoComplete="email"
              required
            />
          </label>
          <label className="mt-4 block text-sm font-semibold text-brand-ink">
            Subject
            <input
              name="subject"
              className="mt-2 w-full rounded-md border border-brand-line bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-burgundy focus:ring-2 focus:ring-brand-gold/40"
              required
            />
          </label>
          <label className="mt-4 block text-sm font-semibold text-brand-ink">
            Your Question
            <textarea
              name="message"
              rows={5}
              className="mt-2 w-full rounded-md border border-brand-line bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-burgundy focus:ring-2 focus:ring-brand-gold/40"
              required
            />
          </label>
          <button
            type="submit"
            className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-brand-burgundy px-5 py-3 text-sm font-bold text-white transition hover:bg-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2"
          >
            Prepare Enquiry
            <Send className="h-4 w-4" />
          </button>

          {status === "error" ? (
            <p className="mt-4 rounded-md bg-white px-4 py-3 text-sm font-semibold text-brand-burgundy">
              Please complete the required fields.
            </p>
          ) : null}
          {status === "ready" ? (
            <p className="mt-4 rounded-md bg-white px-4 py-3 text-sm leading-6 text-brand-muted">
              Enquiry details are ready. Connect a production email provider to
              send from the website, or email {site.contact.email} directly.
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
