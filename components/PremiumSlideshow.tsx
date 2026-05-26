"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

export type PremiumSlide = {
  eyebrow?: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  imagePosition?: string;
};

type PremiumSlideshowProps = {
  slides: PremiumSlide[];
  className?: string;
  heightClassName?: string;
  imagePriority?: boolean;
  compact?: boolean;
  children?: ReactNode;
  headingLevel?: 1 | 2;
  contentAlign?: "left" | "center";
  showArrows?: boolean;
};

export default function PremiumSlideshow({
  slides,
  className,
  heightClassName,
  imagePriority = false,
  compact = false,
  children,
  headingLevel = 2,
  contentAlign = "left",
  showArrows = true,
}: PremiumSlideshowProps) {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const slide = slides[active];

  const intervalMs = compact ? 7200 : 9000;
  const slideHeightClassName =
    heightClassName ?? (compact ? "min-h-[440px]" : "min-h-[680px]");
  const hasFeaturedEyebrow =
    headingLevel === 1 && contentAlign === "center" && !compact;

  useEffect(() => {
    if (reduceMotion || slides.length < 2) {
      return;
    }

    const timer = window.setInterval(() => {
      setActive((value) => (value + 1) % slides.length);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [intervalMs, reduceMotion, slides.length]);

  const controls = useMemo(
    () => ({
      previous: () =>
        setActive((value) => (value - 1 + slides.length) % slides.length),
      next: () => setActive((value) => (value + 1) % slides.length),
    }),
    [slides.length],
  );

  if (!slide) {
    return null;
  }

  return (
    <div
      className={cn(
        "group relative isolate overflow-hidden rounded-md bg-brand-cream shadow-premium",
        slideHeightClassName,
        className,
      )}
    >
      <div className="absolute inset-0 bg-white">
        {slides.map((item, index) => {
          const isActive = active === index;
          const shouldPreload = imagePriority && index === 0;
          const shouldLoadEagerly = imagePriority ? index < 2 : index === 0;

          return (
            <motion.div
              key={`${item.image}-${index}`}
              className="absolute inset-0"
              initial={false}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: 1.25, ease: [0.16, 1, 0.3, 1] }
              }
              aria-hidden={!isActive}
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                className="scale-[1.02] object-cover brightness-110 contrast-105 saturate-105"
                style={{ objectPosition: item.imagePosition ?? "center" }}
                sizes="100vw"
                preload={shouldPreload}
                loading={
                  shouldPreload ? undefined : shouldLoadEagerly ? "eager" : "lazy"
                }
                fetchPriority={
                  shouldPreload || shouldLoadEagerly ? "high" : undefined
                }
              />
            </motion.div>
          );
        })}
      </div>

      <div
        className={cn(
          "absolute inset-0",
          contentAlign === "center"
            ? "premium-slideshow-center-overlay"
            : "bg-gradient-to-r from-brand-ink/45 via-brand-ink/10 to-transparent",
        )}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/18 via-transparent to-transparent" />

      <div
        className={cn(
          "relative z-10 flex h-full flex-col px-5 py-7 sm:px-8 lg:px-10",
          slideHeightClassName,
          contentAlign === "center"
            ? "items-center justify-center text-center"
            : "justify-end",
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${slide.title}-${active}`}
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "premium-hero-copy",
              compact ? "max-w-2xl" : "max-w-4xl",
              contentAlign === "center" && "mx-auto w-full min-w-0",
            )}
          >
            {slide.eyebrow ? (
              <p
                className={cn(
                  "font-bold text-brand-gold",
                  hasFeaturedEyebrow
                    ? "premium-heading brand-slideshow-wordmark mx-auto font-serif text-4xl font-semibold leading-tight sm:text-5xl lg:text-7xl"
                    : "text-sm uppercase tracking-[0.18em] drop-shadow",
                )}
              >
                {slide.eyebrow}
              </p>
            ) : null}
            {headingLevel === 1 ? (
              <h1
                className={cn(
                  "premium-heading mt-3 font-serif font-semibold leading-tight text-white",
                  hasFeaturedEyebrow
                    ? "text-2xl sm:text-3xl lg:text-5xl"
                    : compact
                      ? "text-3xl sm:text-4xl"
                      : "text-4xl sm:text-5xl lg:text-7xl",
                )}
              >
                {slide.title}
              </h1>
            ) : (
              <h2
                className={cn(
                  "premium-heading mt-3 font-serif font-semibold leading-tight text-white",
                  hasFeaturedEyebrow
                    ? "text-2xl sm:text-3xl lg:text-5xl"
                    : compact
                      ? "text-3xl sm:text-4xl"
                      : "text-4xl sm:text-5xl lg:text-7xl",
                )}
              >
                {slide.title}
              </h2>
            )}
            <p
              className={cn(
                "mt-5 font-semibold leading-8 text-white drop-shadow",
                compact ? "text-base" : "max-w-2xl text-lg",
                contentAlign === "center" && "mx-auto w-full min-w-0",
              )}
            >
              {slide.description}
            </p>
          </motion.div>
        </AnimatePresence>

        {children ? (
          <div className={cn("mt-8", contentAlign === "center" && "w-full")}>
            {children}
          </div>
        ) : null}

        <div
          className={cn(
            "mt-8 flex flex-wrap items-center gap-5",
            contentAlign === "center" ? "justify-center" : "justify-between",
          )}
        >
          {showArrows ? (
            <div className="hidden gap-2 sm:flex" aria-label="Slideshow controls">
              <button
                type="button"
                onClick={controls.previous}
                className="flex h-11 w-11 items-center justify-center rounded-md border border-brand-gold/40 bg-white/20 text-white backdrop-blur transition hover:bg-brand-gold hover:text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-gold"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={controls.next}
                className="flex h-11 w-11 items-center justify-center rounded-md border border-brand-gold/40 bg-white/20 text-white backdrop-blur transition hover:bg-brand-gold hover:text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-gold"
                aria-label="Next slide"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          ) : null}

          <div
            className={cn(
              "flex min-w-52 flex-1 items-center gap-2",
              contentAlign === "center" ? "justify-center" : "justify-end",
            )}
          >
            {slides.map((item, index) => (
              <button
                key={item.image}
                type="button"
                onClick={() => setActive(index)}
                className={cn(
                  "h-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-brand-gold",
                  active === index ? "w-10 bg-brand-gold" : "w-2 bg-white/50",
                )}
                aria-label={`Show slide ${index + 1}: ${item.title}`}
                aria-current={active === index ? "true" : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
