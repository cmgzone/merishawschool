import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "support" | "ghost";
  className?: string;
  showIcon?: boolean;
};

const variants = {
  primary:
    "bg-brand-burgundy text-white shadow-lg shadow-brand-burgundy/20 hover:bg-brand-ink",
  secondary:
    "border border-brand-line bg-white text-brand-ink hover:border-brand-gold hover:bg-brand-cream",
  support:
    "bg-brand-gold text-brand-ink shadow-lg shadow-brand-gold/20 hover:bg-white",
  ghost: "text-brand-ink hover:bg-brand-cream",
};

export default function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  showIcon = true,
}: ButtonLinkProps) {
  const isExternal =
    href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
  const classes = cn(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2",
    variants[variant],
    className,
  );

  const content = (
    <>
      <span>{children}</span>
      {showIcon ? <ArrowRight aria-hidden="true" className="h-4 w-4" /> : null}
    </>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        className={classes}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}

