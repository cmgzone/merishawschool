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
};

type PremiumSlideshowProps = {
  slides: PremiumSlide[];
  className?: string;
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

  const intervalMs = compact ? 4200 : 5600;

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

  return (
    <div
      className={cn(
        "group relative isolate overflow-hidden rounded-md bg-brand-cream shadow-premium",
        compact ? "min-h-[440px]" : "min-h-[680px]",
        className,
      )}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.image}
          className="absolute inset-0"
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 1.04 }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
          exit={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 1.02 }}
          transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            className="object-cover brightness-110 contrast-105 saturate-105"
            sizes="100vw"
            preload={imagePriority && active === 0}
            loading={imagePriority && active === 0 ? "eager" : "lazy"}
            fetchPriority={imagePriority && active === 0 ? "high" : undefined}
          />
        </motion.div>
      </AnimatePresence>

      <div
        className={cn(
          "absolute inset-0",
          contentAlign === "center"
            ? "bg-brand-ink/34"
            : "bg-gradient-to-r from-brand-ink/45 via-brand-ink/10 to-transparent",
        )}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/28 via-transparent to-transparent" />

      <div
        className={cn(
          "relative z-10 flex h-full flex-col px-5 py-7 sm:px-8 lg:px-10",
          compact ? "min-h-[440px]" : "min-h-[680px]",
          contentAlign === "center"
            ? "items-center justify-center text-center"
            : "justify-end",
        )}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${slide.title}-${active}`}
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "premium-hero-copy",
              compact ? "max-w-2xl" : "max-w-4xl",
              contentAlign === "center" && "mx-auto",
            )}
          >
            {slide.eyebrow ? (
              <p className="text-sm font-bold uppercase text-brand-gold">
                {slide.eyebrow}
              </p>
            ) : null}
            {headingLevel === 1 ? (
              <h1
                className={cn(
                  "premium-heading mt-3 font-serif font-semibold leading-tight text-white",
                  compact
                    ? "text-3xl sm:text-4xl"
                    : "text-4xl sm:text-6xl lg:text-7xl",
                )}
              >
                {slide.title}
              </h1>
            ) : (
              <h2
                className={cn(
                  "premium-heading mt-3 font-serif font-semibold leading-tight text-white",
                  compact
                    ? "text-3xl sm:text-4xl"
                    : "text-4xl sm:text-6xl lg:text-7xl",
                )}
              >
                {slide.title}
              </h2>
            )}
            <p
              className={cn(
                "mt-5 font-semibold leading-8 text-white drop-shadow",
                compact ? "text-base" : "max-w-2xl text-lg",
                contentAlign === "center" && "mx-auto",
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
