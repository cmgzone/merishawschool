"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import BrandSocialIcon, { type SocialBrand } from "@/components/BrandSocialIcon";
import { siteConfig } from "@/data/site";

type FloatingSocialRailProps = {
  socials?: typeof siteConfig.socials;
};

export default function FloatingSocialRail({
  socials = siteConfig.socials,
}: FloatingSocialRailProps) {
  const pathname = usePathname();
  const [hideMobileBar, setHideMobileBar] = useState(false);
  const isAdminPage = pathname.startsWith("/admin");
  const socialLinks = [
    {
      label: "Facebook",
      brand: "facebook",
      href: socials.facebook,
      className: "bg-[#1877F2]",
    },
    {
      label: "YouTube",
      brand: "youtube",
      href: socials.youtube,
      className: "bg-[#FF0000]",
    },
    {
      label: "Instagram",
      brand: "instagram",
      href: socials.instagram,
      className: "bg-gradient-to-br from-[#833AB4] via-[#E1306C] to-[#FCAF45]",
    },
    {
      label: "X",
      brand: "x",
      href: socials.x,
      className: "bg-brand-ink",
    },
  ] satisfies Array<{
    label: string;
    brand: SocialBrand;
    href: string;
    className: string;
  }>;

  useEffect(() => {
    if (isAdminPage) {
      return;
    }

    const footer = document.querySelector("[data-site-footer]");

    if (!footer) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHideMobileBar(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px 0px 180px 0px",
        threshold: 0,
      },
    );

    observer.observe(footer);

    return () => observer.disconnect();
  }, [isAdminPage]);

  if (isAdminPage) {
    return null;
  }

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

      <AnimatePresence>
        {!hideMobileBar ? (
          <motion.aside
            key="mobile-social-links"
            aria-label="Mobile social links"
            className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-4 lg:hidden"
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 22, scale: 0.94 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="pointer-events-auto flex w-full max-w-[316px] items-center justify-center gap-1.5 rounded-md border border-brand-gold/40 bg-white/94 p-2 shadow-premium backdrop-blur">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Visit Merishaw School on ${item.label}`}
                  className={`${item.className} flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-white shadow-sm transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2`}
                >
                  <BrandSocialIcon brand={item.brand} className="h-4 w-4" />
                </a>
              ))}
              <Link
                href="/contact"
                aria-label="Contact Merishaw School"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand-gold text-brand-ink shadow-sm transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2"
              >
                <MessageCircle aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </>
  );
}
