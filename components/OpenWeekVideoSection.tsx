import { CalendarDays, Clock3, Compass, Phone, PlayCircle, Sparkles, UsersRound } from "lucide-react";
import ButtonLink from "@/components/ButtonLink";
import MotionReveal from "@/components/MotionReveal";

type OpenWeekVideoSectionProps = {
  tone?: "light" | "cream";
  videoSrc?: string;
  posterSrc?: string;
};

const openWeekHighlights = [
  {
    icon: Sparkles,
    title: "What to Expect",
    description:
      "A firsthand look at our curriculum, campus life, and student transformation.",
  },
  {
    icon: Compass,
    title: "Campus Tour",
    description:
      "Explore our world-class facilities, modern boarding, and serene learning environment.",
  },
  {
    icon: UsersRound,
    title: "Meet Our Staff",
    description:
      "Engage with our visionary educators, guidance teams, and leadership.",
  },
];

export default function OpenWeekVideoSection({
  tone = "cream",
  videoSrc = "/videos/open-week-2026.mp4",
  posterSrc = "/images/gallery-campus-administration-block.jpeg",
}: OpenWeekVideoSectionProps) {
  return (
    <section
      aria-labelledby="open-week-video-heading"
      className={
        tone === "cream"
          ? "bg-brand-cream px-4 py-16 sm:px-6 lg:px-8"
          : "bg-white px-4 py-16 sm:px-6 lg:px-8"
      }
    >
      <div className="mx-auto max-w-7xl overflow-hidden rounded-md border border-brand-gold/60 bg-white p-5 shadow-premium sm:p-8 lg:p-10">
        <div className="grid gap-10 lg:grid-cols-[380px_1fr] lg:items-center xl:grid-cols-[410px_1fr]">
          <MotionReveal>
            <div className="mx-auto w-full max-w-sm overflow-hidden rounded-md border-2 border-brand-gold bg-brand-ink shadow-premium">
              <div className="flex items-center justify-between border-b border-brand-gold/30 bg-brand-burgundy px-4 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-brand-gold">
                <span className="flex items-center gap-2">
                  <PlayCircle className="h-4 w-4 shrink-0" />
                  Featured Video
                </span>
                <span className="rounded bg-brand-gold px-2 py-0.5 text-[11px] font-extrabold text-brand-ink">
                  Open Week
                </span>
              </div>
              <div className="aspect-[9/16] w-full bg-brand-ink">
                <video
                  src={videoSrc}
                  poster={posterSrc}
                  controls
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-contain"
                  aria-label="Merishaw School Open Week official announcement video"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.08}>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 rounded-md bg-brand-burgundy px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-white">
                <PlayCircle className="h-4 w-4 text-brand-gold" />
                Most Important Announcement
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-md border border-brand-gold bg-brand-cream px-3 py-1.5 text-xs font-bold uppercase tracking-[0.1em] text-brand-burgundy">
                23rd – 29th November
              </span>
            </div>

            <h2
              id="open-week-video-heading"
              className="premium-heading mt-4 font-serif text-3xl font-semibold leading-tight text-brand-ink sm:text-5xl"
            >
              Merishaw School welcomes you to our Open Week.
            </h2>

            <p className="mt-4 text-base leading-8 text-brand-muted sm:text-lg">
              Watch our official Open Week announcement video and join us on
              campus from{" "}
              <strong className="font-semibold text-brand-ink">
                23rd November to 29th November
              </strong>{" "}
              to experience academic excellence, discipline, and international
              exposure at the Home of the Boy Child.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-md border border-brand-line bg-brand-cream px-4 py-3">
                <CalendarDays className="h-5 w-5 shrink-0 text-brand-burgundy" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-brand-burgundy">
                    Open Week Dates
                  </p>
                  <p className="text-sm font-semibold text-brand-ink">
                    23rd November – 29th November
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-md border border-brand-line bg-brand-cream px-4 py-3">
                <Clock3 className="h-5 w-5 shrink-0 text-brand-burgundy" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-brand-burgundy">
                    Visiting Hours
                  </p>
                  <p className="text-sm font-semibold text-brand-ink">
                    9:00 AM – 5:00 PM Daily
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {openWeekHighlights.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-md border border-brand-line bg-white p-4 shadow-card"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-brand-burgundy text-brand-gold">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h3 className="mt-3 font-serif text-lg font-semibold text-brand-ink">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-6 text-brand-muted">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 rounded-md border border-brand-gold/50 bg-brand-burgundy px-5 py-4 text-white">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-gold">
                    Our Admissions Are Ongoing
                  </p>
                  <p className="mt-1 text-sm text-white/90">
                    Book a campus tour or speak directly with our admissions
                    team during Open Week.
                  </p>
                </div>
                <a
                  href="tel:+254721303303"
                  className="inline-flex shrink-0 items-center gap-2 rounded-md bg-brand-gold px-3.5 py-2 text-xs font-extrabold uppercase tracking-wider text-brand-ink transition hover:bg-white"
                >
                  <Phone className="h-3.5 w-3.5" />
                  0721 303 303 / 0731 303 350
                </a>
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact">Plan Your Open Week Visit</ButtonLink>
              <ButtonLink href="/admissions" variant="support">
                Start Admissions
              </ButtonLink>
              <ButtonLink
                href="/news/merishaw-school-open-week-2026"
                variant="secondary"
              >
                Read Full Details
              </ButtonLink>
            </div>
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}
