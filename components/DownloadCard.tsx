import { Download, ExternalLink } from "lucide-react";
import MotionReveal from "@/components/MotionReveal";

type DownloadCardProps = {
  title: string;
  description: string;
  href: string;
  type: string;
  isLocal?: boolean;
  needsClientApproval?: boolean;
  index?: number;
};

export default function DownloadCard({
  title,
  description,
  href,
  type,
  isLocal,
  needsClientApproval,
  index = 0,
}: DownloadCardProps) {
  return (
    <MotionReveal delay={index * 0.05}>
      <article className="flex h-full flex-col rounded-md border border-brand-line bg-white p-6 shadow-card">
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-md bg-brand-cream text-brand-burgundy">
            {isLocal ? <Download className="h-5 w-5" /> : <ExternalLink className="h-5 w-5" />}
          </div>
          <span className="rounded-md bg-brand-burgundy px-3 py-1 text-xs font-bold uppercase text-white">
            {type}
          </span>
        </div>
        <h3 className="mt-5 font-serif text-2xl font-semibold text-brand-ink">
          {title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-7 text-brand-muted">
          {description}
        </p>
        {needsClientApproval ? (
          <p className="mt-4 rounded-md bg-brand-cream px-3 py-2 text-xs font-semibold text-brand-burgundy">
            Pending client approval or replacement.
          </p>
        ) : null}
        <a
          href={href}
          target={isLocal ? undefined : "_blank"}
          rel={isLocal ? undefined : "noreferrer"}
          className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-brand-burgundy px-4 py-2 text-sm font-bold text-white transition hover:bg-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2"
        >
          Open download
          {isLocal ? <Download className="h-4 w-4" /> : <ExternalLink className="h-4 w-4" />}
        </a>
      </article>
    </MotionReveal>
  );
}
