import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import BrandSocialIcon, { type SocialBrand } from "@/components/BrandSocialIcon";
import { siteConfig } from "@/data/site";

type FooterSiteConfig = {
  name: string;
  tagline: string;
  description: string;
  logoLandscape: string;
  contact: typeof siteConfig.contact;
  socials: typeof siteConfig.socials;
  partners: typeof siteConfig.partners;
};

type FooterProps = {
  site?: FooterSiteConfig;
};

export default function Footer({ site = siteConfig }: FooterProps) {
  const partners = site.partners.filter((partner) => partner.name);
  const footerSocialLinks = [
    {
      label: "Facebook",
      brand: "facebook",
      href: site.socials.facebook,
    },
    {
      label: "Instagram",
      brand: "instagram",
      href: site.socials.instagram,
    },
    {
      label: "YouTube",
      brand: "youtube",
      href: site.socials.youtube,
    },
    {
      label: "X",
      brand: "x",
      href: site.socials.x,
    },
  ] satisfies Array<{
    label: string;
    brand: SocialBrand;
    href: string;
  }>;

  return (
    <footer data-site-footer className="bg-brand-burgundy text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="flex items-center gap-4">
              <Image
                src={site.logoLandscape}
                alt="Merishaw School logo"
                width={242}
                height={125}
                className="h-20 w-auto rounded bg-white p-2"
              />
              <div>
                <p className="font-serif text-3xl font-semibold">
                  {site.name}
                </p>
                <p className="text-sm font-semibold uppercase text-brand-gold">
                  {site.tagline}
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm leading-7 text-white/80">
              {site.description}
            </p>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase text-brand-gold">
              Contact
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" />
                <span>
                  {site.contact.address}
                  <br />
                  {site.contact.postal}
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" />
                <a
                  href={`tel:${site.contact.phonePrimary.replace(/\s/g, "")}`}
                >
                  {site.contact.phonePrimary} / {site.contact.phoneSecondary}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" />
                <a href={`mailto:${site.contact.email}`}>
                  {site.contact.email}
                </a>
              </li>
            </ul>
            <div className="mt-6 flex gap-3">
              {footerSocialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Merishaw School on ${item.label}`}
                  className="rounded-md border border-white/20 p-2 text-white/80 transition hover:border-brand-gold hover:text-brand-gold"
                >
                  <BrandSocialIcon brand={item.brand} className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {partners.length ? (
          <div className="mt-12 border-t border-white/10 pt-7">
            <div className="flex items-center justify-center gap-4">
              <span className="h-px w-16 bg-white/20 sm:w-28" />
              <h2 className="text-center text-xs font-bold uppercase tracking-wide text-brand-gold">
                Our Partners
              </h2>
              <span className="h-px w-16 bg-white/20 sm:w-28" />
            </div>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              {partners.map((partner, index) => {
                const initials = partner.name
                  .split(/\s+/)
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2);
                const logo = partner.logo ? (
                  <Image
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    width={80}
                    height={80}
                    className="max-h-7 max-w-7 object-contain"
                  />
                ) : (
                  <span className="text-[10px] font-bold uppercase text-brand-burgundy">
                    {initials}
                  </span>
                );

                const className =
                  "flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white p-2 shadow-sm transition hover:border-brand-gold hover:shadow-md";

                return partner.href ? (
                  <a
                    key={`${partner.name}-${index}`}
                    href={partner.href}
                    target="_blank"
                    rel="noreferrer"
                    className={className}
                    aria-label={partner.name}
                  >
                    {logo}
                  </a>
                ) : (
                  <div
                    key={`${partner.name}-${index}`}
                    className={className}
                    aria-label={partner.name}
                  >
                    {logo}
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-white/70">
        Copyright (c) {new Date().getFullYear()} Merishaw School. All rights
        reserved.
      </div>
    </footer>
  );
}
