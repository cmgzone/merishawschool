import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { navigation, supportNavItem } from "@/data/navigation";
import { siteConfig } from "@/data/site";

export default function Footer() {
  return (
    <footer className="bg-brand-burgundy text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-4">
            <Image
              src={siteConfig.logoLandscape}
              alt="Merishaw School logo"
              width={242}
              height={125}
              className="h-20 w-auto rounded bg-white p-2"
            />
            <div>
              <p className="font-serif text-3xl font-semibold">Merishaw School</p>
              <p className="text-sm font-semibold uppercase text-brand-gold">
                Home of the Boy Child
              </p>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-7 text-white/80">
            A residential boys&apos; high school committed to academic excellence,
            values-led formation, mentorship, and the holistic development of
            purpose-driven global leaders.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase text-brand-gold">
            Quick Links
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {[...navigation.slice(1), supportNavItem].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-white/80 transition hover:text-brand-gold"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase text-brand-gold">
            Contact
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" />
              <span>
                {siteConfig.contact.address}
                <br />
                {siteConfig.contact.postal}
              </span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" />
              <a href={`tel:${siteConfig.contact.phonePrimary.replace(/\s/g, "")}`}>
                {siteConfig.contact.phonePrimary} / {siteConfig.contact.phoneSecondary}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" />
              <a href={`mailto:${siteConfig.contact.email}`}>
                {siteConfig.contact.email}
              </a>
            </li>
          </ul>
          <div className="mt-6 flex gap-3">
            <a
              href={siteConfig.socials.facebook}
              aria-label="Merishaw School on Facebook"
              className="rounded-md border border-white/20 p-2 text-white/80 transition hover:border-brand-gold hover:text-brand-gold"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
            <a
              href={siteConfig.socials.instagram}
              aria-label="Merishaw School on Instagram"
              className="rounded-md border border-white/20 p-2 text-white/80 transition hover:border-brand-gold hover:text-brand-gold"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
            <a
              href={siteConfig.socials.youtube}
              aria-label="Merishaw School on YouTube"
              className="rounded-md border border-white/20 p-2 text-white/80 transition hover:border-brand-gold hover:text-brand-gold"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-white/70">
        Copyright (c) {new Date().getFullYear()} Merishaw School. Rebuild prepared
        for production handoff.
      </div>
    </footer>
  );
}
