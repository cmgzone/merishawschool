import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";

const socialLinks = [
  {
    label: "Facebook",
    shortLabel: "f",
    href: siteConfig.socials.facebook,
    className: "bg-[#1877F2]",
  },
  {
    label: "YouTube",
    shortLabel: "YT",
    href: siteConfig.socials.youtube,
    className: "bg-[#FF0000]",
  },
  {
    label: "Instagram",
    shortLabel: "IG",
    href: siteConfig.socials.instagram,
    className: "bg-gradient-to-br from-[#833AB4] via-[#E1306C] to-[#FCAF45]",
  },
  {
    label: "X",
    shortLabel: "X",
    href: siteConfig.socials.x,
    className: "bg-brand-ink",
  },
];

export default function FloatingSocialRail() {
  return (
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
          {item.shortLabel}
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
  );
}
