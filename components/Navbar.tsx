"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  HandHeart,
  HeartHandshake,
  Mail,
  MapPin,
  Menu,
  Phone,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { csrNavItem, navigationGroups, supportNavItem } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

type NavbarSiteConfig = {
  tagline: string;
  logoLandscape: string;
  contact: typeof siteConfig.contact;
};

type NavbarProps = {
  site?: NavbarSiteConfig;
};

export default function Navbar({ site = siteConfig }: NavbarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);

  const isActive = (href?: string) =>
    href ? (href === "/" ? pathname === "/" : pathname.startsWith(href)) : false;

  const groupIsActive = (item: (typeof navigationGroups)[number]) =>
    isActive(item.href) || item.children?.some((child) => isActive(child.href));

  useEffect(() => {
    document.documentElement.classList.toggle("mobile-menu-open", open);
    window.dispatchEvent(new Event("merishaw:mobile-menu-toggle"));

    return () => document.documentElement.classList.remove("mobile-menu-open");
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-brand-line/80 bg-white/95 pt-[env(safe-area-inset-top)] backdrop-blur-xl">
      <div className="hidden border-b border-brand-line bg-brand-ink text-white lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-4 py-1.5 text-[11px] font-semibold sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
            <a
              href={`tel:${site.contact.phonePrimary.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 text-white/88 transition hover:text-brand-gold"
            >
              <Phone aria-hidden="true" className="h-3 w-3" />
              {site.contact.phonePrimary}
            </a>
            <a
              href={`mailto:${site.contact.email}`}
              className="inline-flex items-center gap-2 text-white/88 transition hover:text-brand-gold"
            >
              <Mail aria-hidden="true" className="h-3 w-3" />
              {site.contact.email}
            </a>
            <span className="hidden items-center gap-2 text-white/78 min-[1180px]:inline-flex">
              <MapPin aria-hidden="true" className="h-3 w-3" />
              {site.contact.address}
            </span>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-brand-gold transition hover:text-white"
          >
            Book a visit or enquire
            <ChevronDown aria-hidden="true" className="h-3 w-3 -rotate-90" />
          </Link>
        </div>
      </div>
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8 xl:py-2.5"
      >
        <Link
          href="/"
          className="flex shrink-0 items-center rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2"
          onClick={() => setOpen(false)}
        >
          <Image
            src={site.logoLandscape}
            alt="Merishaw School logo"
            width={242}
            height={125}
            className="h-14 w-auto sm:h-16 xl:h-12"
            loading="eager"
            priority
          />
        </Link>

        <div className="hidden min-w-0 flex-1 px-2 min-[520px]:block xl:hidden">
          <p className="truncate text-xs font-bold uppercase tracking-[0.14em] text-brand-burgundy">
            {site.tagline}
          </p>
          <p className="mt-1 truncate text-sm font-semibold text-brand-ink">
            Residential boys&apos; high school
          </p>
        </div>

        <div className="hidden items-center gap-0.5 xl:flex">
          {navigationGroups.map((item) =>
            item.children ? (
              <div key={item.label} className="group relative">
                {item.href ? (
                  <Link
                    href={item.href}
                    className={cn(
                      "inline-flex items-center gap-1 whitespace-nowrap rounded-md px-2 py-1.5 text-[13px] font-semibold leading-tight transition hover:bg-brand-cream hover:text-brand-burgundy",
                      groupIsActive(item)
                        ? "text-brand-burgundy"
                        : "text-brand-ink/80",
                    )}
                    aria-haspopup="true"
                    aria-label={item.label}
                  >
                    {item.label}
                    <ChevronDown
                      aria-hidden="true"
                      className="h-3 w-3 transition group-hover:rotate-180"
                    />
                  </Link>
                ) : (
                  <button
                    type="button"
                    className={cn(
                      "inline-flex items-center gap-1 whitespace-nowrap rounded-md px-2 py-1.5 text-[13px] font-semibold leading-tight transition hover:bg-brand-cream hover:text-brand-burgundy",
                      groupIsActive(item)
                        ? "text-brand-burgundy"
                        : "text-brand-ink/80",
                    )}
                    aria-haspopup="true"
                    aria-label={item.label}
                  >
                    {item.label}
                    <ChevronDown
                      aria-hidden="true"
                      className="h-3 w-3 transition group-hover:rotate-180"
                    />
                  </button>
                )}
                <div className="pointer-events-none absolute left-0 top-full z-50 w-72 translate-y-2 pt-3 opacity-0 transition duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  <div className="overflow-hidden rounded-md border border-brand-line bg-white shadow-premium">
                    <div className="grid py-2">
                      {item.children.map((child) => (
                        <Link
                          key={`${item.label}-${child.label}`}
                          href={child.href}
                          className={cn(
                            "px-4 py-2.5 text-sm font-medium text-brand-ink transition hover:bg-brand-cream hover:text-brand-burgundy",
                            isActive(child.href) && "text-brand-burgundy",
                          )}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "whitespace-nowrap rounded-md px-2 py-1.5 text-[13px] font-semibold leading-tight transition hover:bg-brand-cream hover:text-brand-burgundy",
                  isActive(item.href)
                    ? "text-brand-burgundy"
                    : "text-brand-ink/80",
                )}
                aria-label={item.label}
              >
                {item.label}
              </Link>
            ),
          )}
        </div>

        <div className="hidden items-center gap-2 xl:flex">
          <Link
            href="/contact"
            className="contact-pulse inline-flex min-h-9 items-center gap-1.5 rounded-md bg-brand-burgundy px-3 py-1.5 text-[13px] font-bold text-white shadow-lg shadow-brand-burgundy/20 transition hover:-translate-y-0.5 hover:bg-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2"
          >
            <Mail aria-hidden="true" className="h-3.5 w-3.5" />
            Contact
          </Link>
          <Link
            href={csrNavItem.href}
            className="inline-flex min-h-9 items-center gap-1.5 rounded-md border border-brand-gold bg-white px-3 py-1.5 text-[13px] font-bold text-brand-burgundy shadow-sm transition hover:bg-brand-cream focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2"
            aria-label="CSR"
          >
            <HandHeart aria-hidden="true" className="h-3.5 w-3.5" />
            {csrNavItem.label}
          </Link>
          <Link
            href={supportNavItem.href}
            className="inline-flex min-h-9 items-center gap-1.5 rounded-md bg-brand-gold px-3 py-1.5 text-[13px] font-bold text-brand-ink shadow-sm transition hover:bg-brand-burgundy hover:text-white focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2"
            aria-label={supportNavItem.label}
          >
            <HeartHandshake aria-hidden="true" className="h-3.5 w-3.5" />
            Sponsor
          </Link>
        </div>

        <div className="ml-auto flex items-center gap-2 xl:hidden">
          <Link
            href="/contact"
            className="inline-flex h-11 min-w-11 items-center justify-center gap-2 rounded-md bg-brand-burgundy px-3 text-sm font-bold text-white shadow-sm transition hover:bg-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 min-[520px]:px-4"
            onClick={() => setOpen(false)}
            aria-label="Contact Merishaw School"
          >
            <Mail aria-hidden="true" className="h-4 w-4" />
            <span className="hidden min-[520px]:inline">Contact Us</span>
          </Link>
          <Link
            href={supportNavItem.href}
            className="hidden h-11 items-center justify-center gap-2 rounded-md bg-brand-gold px-4 text-sm font-bold text-brand-ink shadow-sm transition hover:bg-brand-burgundy hover:text-white focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 md:inline-flex"
            onClick={() => setOpen(false)}
          >
            <HeartHandshake aria-hidden="true" className="h-4 w-4" />
            Sponsor
          </Link>
          <Link
            href={csrNavItem.href}
            className="hidden h-11 items-center justify-center gap-2 rounded-md border border-brand-gold bg-white px-4 text-sm font-bold text-brand-burgundy shadow-sm transition hover:bg-brand-cream focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 lg:inline-flex"
            onClick={() => setOpen(false)}
            aria-label="CSR"
          >
            <HandHeart aria-hidden="true" className="h-4 w-4" />
            CSR
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-brand-line text-brand-ink transition hover:bg-brand-cream focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[60] min-h-dvh bg-brand-ink/50 backdrop-blur-sm xl:hidden"
          >
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="ml-auto flex h-dvh min-h-dvh w-full max-w-[420px] flex-col bg-white pb-[env(safe-area-inset-bottom)] shadow-premium"
              aria-label="Mobile navigation"
            >
              <div className="flex items-center justify-between border-b border-brand-line px-5 py-4">
                <Link
                  href="/"
                  className="rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2"
                  onClick={() => setOpen(false)}
                >
                  <Image
                    src={site.logoLandscape}
                    alt="Merishaw School logo"
                    width={190}
                    height={98}
                    className="h-14 w-auto"
                  />
                </Link>
                <button
                  type="button"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-brand-line text-brand-ink transition hover:bg-brand-cream focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2"
                  aria-label="Close navigation menu"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3 border-b border-brand-line bg-brand-cream px-5 py-4">
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="contact-pulse inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-brand-burgundy px-3 py-3 text-sm font-bold text-white shadow-lg shadow-brand-burgundy/20"
                >
                  <Mail aria-hidden="true" className="h-4 w-4" />
                  Contact
                </Link>
                <Link
                  href={csrNavItem.href}
                  onClick={() => setOpen(false)}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-brand-gold bg-white px-3 py-3 text-sm font-bold text-brand-burgundy shadow-sm"
                >
                  <HandHeart aria-hidden="true" className="h-4 w-4" />
                  CSR
                </Link>
                <Link
                  href={supportNavItem.href}
                  onClick={() => setOpen(false)}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-brand-gold px-3 py-3 text-sm font-bold text-brand-ink shadow-sm"
                >
                  <HeartHandshake aria-hidden="true" className="h-4 w-4" />
                  Sponsor
                </Link>
              </div>

              <div className="flex-1 overflow-y-auto bg-white px-5 py-5">
                <div className="grid gap-2">
                  {navigationGroups.map((item) =>
                    item.children ? (
                      <div
                        key={item.label}
                        className="overflow-hidden rounded-md border border-brand-line bg-white"
                      >
                        <button
                          type="button"
                          onClick={() =>
                            setMobileGroup((current) =>
                              current === item.label ? null : item.label,
                            )
                          }
                          className={cn(
                            "flex w-full items-center justify-between px-4 py-3 text-left text-base font-bold transition",
                            groupIsActive(item)
                              ? "bg-brand-cream text-brand-burgundy"
                              : "text-brand-ink hover:bg-brand-cream",
                          )}
                          aria-expanded={mobileGroup === item.label}
                        >
                          {item.label}
                          <ChevronDown
                            aria-hidden="true"
                            className={cn(
                              "h-4 w-4 transition",
                              mobileGroup === item.label && "rotate-180",
                            )}
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {mobileGroup === item.label ? (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden border-t border-brand-line"
                            >
                              <div className="grid py-2">
                                {item.href ? (
                                  <Link
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                    className="px-5 py-2 text-sm font-bold text-brand-burgundy transition hover:bg-brand-cream"
                                  >
                                    {item.label} Overview
                                  </Link>
                                ) : null}
                                {item.children.map((child) => (
                                  <Link
                                    key={`${item.label}-${child.label}`}
                                    href={child.href}
                                    onClick={() => setOpen(false)}
                                    className="px-5 py-2 text-sm font-medium text-brand-muted transition hover:bg-brand-cream hover:text-brand-burgundy"
                                  >
                                    {child.label}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          ) : null}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "rounded-md border border-transparent px-4 py-3 text-base font-bold transition",
                          isActive(item.href)
                            ? "border-brand-line bg-brand-cream text-brand-burgundy"
                            : "text-brand-ink hover:bg-brand-cream",
                        )}
                      >
                        {item.label}
                      </Link>
                    ),
                  )}
                </div>
              </div>

              <div className="border-t border-brand-line px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-muted">
                  Merishaw School
                </p>
                <p className="mt-1 text-sm font-medium text-brand-ink">
                  {site.tagline}
                </p>
              </div>
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
