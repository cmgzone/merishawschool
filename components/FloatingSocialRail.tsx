import Link from "next/link";
import { MessageCircle } from "lucide-react";
import BrandSocialIcon, { type SocialBrand } from "@/components/BrandSocialIcon";
import { siteConfig } from "@/data/site";

const socialLinks = [
  {
    label: "Facebook",
    brand: "facebook",
    href: siteConfig.socials.facebook,
    className: "bg-[#1877F2]",
  },
  {
    label: "YouTube",
    brand: "youtube",
    href: siteConfig.socials.youtube,
    className: "bg-[#FF0000]",
  },
  {
    label: "Instagram",
    brand: "instagram",
    href: siteConfig.socials.instagram,
    className: "bg-gradient-to-br from-[#833AB4] via-[#E1306C] to-[#FCAF45]",
  },
  {
    label: "X",
    brand: "x",
    href: siteConfig.socials.x,
    className: "bg-brand-ink",
  },
] satisfies Array<{
  label: string;
  brand: SocialBrand;
  href: string;
  className: string;
}>;

export default function FloatingSocialRail() {
  return (
    <>
      <aside
        aria-label="Social links"
        className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2 lg:flex"
      >
        {socialLinks.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`Visit Merishaw School on ${item.label}`}
            className={`${item.className} flex h-11 w-11 items-center justify-center rounded-md text-sm font-black text-white shadow-lg shadow-brand-ink/20 transition hover:-translate-x-1 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2`}
          >
            <BrandSocialIcon brand={item.brand} />
          </a>
        ))}
        <Link
          href="/contact"
          aria-label="Contact Merishaw School"
          className="flex h-11 w-11 items-center justify-center rounded-md bg-brand-gold text-brand-ink shadow-lg shadow-brand-ink/20 transition hover:-translate-x-1 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2"
        >
          <MessageCircle aria-hidden="true" className="h-5 w-5" />
        </Link>
      </aside>

      <aside
        aria-label="Mobile social links"
        className="fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-md border border-brand-gold/40 bg-white/94 p-2 shadow-premium backdrop-blur lg:hidden"
      >
        {socialLinks.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`Visit Merishaw School on ${item.label}`}
            className={`${item.className} flex h-10 w-10 items-center justify-center rounded-md text-white shadow-sm transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2`}
          >
            <BrandSocialIcon brand={item.brand} className="h-4 w-4" />
          </a>
        ))}
        <Link
          href="/contact"
          aria-label="Contact Merishaw School"
          className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-gold text-brand-ink shadow-sm transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2"
        >
          <MessageCircle aria-hidden="true" className="h-4 w-4" />
        </Link>
      </aside>
    </>
  );
}
