"use client";

import { useRouter } from "next/navigation";
import {
  ChangeEvent,
  ReactNode,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import type {
  EditableAcademicProgram,
  EditableAdmissionsStep,
  EditableComingSoonPage,
  EditableContent,
  EditableDownloadItem,
  EditableGalleryImage,
  EditableLeadershipPerson,
  EditableNewsItem,
  EditablePageHeader,
  EditablePillar,
  EditableSectionIntro,
  EditableSlide,
  EditableStat,
  EditableTextCard,
  EditableValue,
} from "@/data/admin-content";
import { cn } from "@/lib/utils";

type AdminContentEditorProps = {
  csrfToken: string;
  initialContent: EditableContent;
};

type TabId =
  | "site"
  | "pages"
  | "about"
  | "home"
  | "academics"
  | "admissions"
  | "gallery"
  | "downloads"
  | "news"
  | "leadership"
  | "support";

type SaveStatus =
  | { tone: "idle"; message: string }
  | { tone: "saving"; message: string }
  | { tone: "saved"; message: string }
  | { tone: "error"; message: string };

type IconProps = {
  className?: string;
};

type IconComponent = (props: IconProps) => ReactNode;

function AdminSvgIcon({
  children,
  className,
}: IconProps & { children: ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      {children}
    </svg>
  );
}

function AlertTriangle({ className }: IconProps) {
  return (
    <AdminSvgIcon className={className}>
      <path d="M12 3 2 21h20L12 3Z" />
      <path d="M12 9v5" />
      <path d="M12 18h.01" />
    </AdminSvgIcon>
  );
}

function BookOpenCheck({ className }: IconProps) {
  return (
    <AdminSvgIcon className={className}>
      <path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H20v17H8a4 4 0 0 0-4 4Z" />
      <path d="M4 5.5A3.5 3.5 0 0 0 .5 2" />
      <path d="m9 12 2 2 4-5" />
    </AdminSvgIcon>
  );
}

function CheckCircle2({ className }: IconProps) {
  return (
    <AdminSvgIcon className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12 2.5 2.5L16 9" />
    </AdminSvgIcon>
  );
}

function ClipboardList({ className }: IconProps) {
  return (
    <AdminSvgIcon className={className}>
      <path d="M9 4h6" />
      <path d="M9 2h6v4H9z" />
      <path d="M5 4h3v4h8V4h3v18H5z" />
      <path d="M9 12h6" />
      <path d="M9 16h6" />
    </AdminSvgIcon>
  );
}

function Download({ className }: IconProps) {
  return (
    <AdminSvgIcon className={className}>
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 21h14" />
    </AdminSvgIcon>
  );
}

function FileText({ className }: IconProps) {
  return (
    <AdminSvgIcon className={className}>
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v5h4" />
      <path d="M9 13h6" />
      <path d="M9 17h6" />
    </AdminSvgIcon>
  );
}

function HeartHandshake({ className }: IconProps) {
  return (
    <AdminSvgIcon className={className}>
      <path d="M12 21s-7-4.5-9-9.5C1.8 8.4 3.7 5 7 5c2 0 3.2 1 5 3 1.8-2 3-3 5-3 3.3 0 5.2 3.4 4 6.5C19 16.5 12 21 12 21Z" />
      <path d="m8 13 2 2 4-4 2 2" />
    </AdminSvgIcon>
  );
}

function Home({ className }: IconProps) {
  return (
    <AdminSvgIcon className={className}>
      <path d="m3 11 9-8 9 8" />
      <path d="M5 10v11h14V10" />
      <path d="M10 21v-6h4v6" />
    </AdminSvgIcon>
  );
}

function ImageIcon({ className }: IconProps) {
  return (
    <AdminSvgIcon className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="8" cy="10" r="1.5" />
      <path d="m4 17 5-5 4 4 3-3 4 4" />
    </AdminSvgIcon>
  );
}

function ImagePlus({ className }: IconProps) {
  return (
    <AdminSvgIcon className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M12 9v6" />
      <path d="M9 12h6" />
      <path d="m4 17 4-4 3 3" />
    </AdminSvgIcon>
  );
}

function LogOut({ className }: IconProps) {
  return (
    <AdminSvgIcon className={className}>
      <path d="M10 17v2H4V5h6v2" />
      <path d="M14 7l5 5-5 5" />
      <path d="M8 12h11" />
    </AdminSvgIcon>
  );
}

function Newspaper({ className }: IconProps) {
  return (
    <AdminSvgIcon className={className}>
      <path d="M4 5h14v14H4z" />
      <path d="M18 8h2v11h-2" />
      <path d="M7 9h5" />
      <path d="M7 13h8" />
      <path d="M7 17h8" />
    </AdminSvgIcon>
  );
}

function Plus({ className }: IconProps) {
  return (
    <AdminSvgIcon className={className}>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </AdminSvgIcon>
  );
}

function RotateCcw({ className }: IconProps) {
  return (
    <AdminSvgIcon className={className}>
      <path d="M3 7v6h6" />
      <path d="M3.5 13A8.5 8.5 0 1 0 6 6" />
    </AdminSvgIcon>
  );
}

function Save({ className }: IconProps) {
  return (
    <AdminSvgIcon className={className}>
      <path d="M5 3h12l2 2v16H5z" />
      <path d="M8 3v6h8V3" />
      <path d="M8 21v-7h8v7" />
    </AdminSvgIcon>
  );
}

function Settings({ className }: IconProps) {
  return (
    <AdminSvgIcon className={className}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3" />
      <path d="M12 19v3" />
      <path d="M2 12h3" />
      <path d="M19 12h3" />
      <path d="m4.9 4.9 2.1 2.1" />
      <path d="m17 17 2.1 2.1" />
      <path d="m19.1 4.9-2.1 2.1" />
      <path d="m7 17-2.1 2.1" />
    </AdminSvgIcon>
  );
}

function Trash2({ className }: IconProps) {
  return (
    <AdminSvgIcon className={className}>
      <path d="M4 7h16" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M6 7l1 14h10l1-14" />
      <path d="M9 7V4h6v3" />
    </AdminSvgIcon>
  );
}

function Upload({ className }: IconProps) {
  return (
    <AdminSvgIcon className={className}>
      <path d="M12 21V9" />
      <path d="m7 14 5-5 5 5" />
      <path d="M5 3h14" />
    </AdminSvgIcon>
  );
}

function UserRound({ className }: IconProps) {
  return (
    <AdminSvgIcon className={className}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </AdminSvgIcon>
  );
}

const tabs = [
  { id: "site", label: "Site", icon: Settings },
  { id: "pages", label: "Pages", icon: FileText },
  { id: "about", label: "About", icon: BookOpenCheck },
  { id: "home", label: "Home", icon: Home },
  { id: "academics", label: "Academics", icon: BookOpenCheck },
  { id: "admissions", label: "Admissions", icon: ClipboardList },
  { id: "gallery", label: "Gallery", icon: ImageIcon },
  { id: "downloads", label: "Downloads", icon: Download },
  { id: "news", label: "News & Events", icon: Newspaper },
  { id: "leadership", label: "Leadership", icon: UserRound },
  { id: "support", label: "Support", icon: HeartHandshake },
] satisfies Array<{ id: TabId; label: string; icon: IconComponent }>;

type PageHeaderKey = Exclude<keyof EditableContent["pages"], "comingSoon">;

const pageHeaderConfigs = [
  { id: "about", label: "About" },
  { id: "academics", label: "Academics" },
  { id: "admissions", label: "Admissions" },
  { id: "leadership", label: "Leadership" },
  { id: "gallery", label: "Gallery" },
  { id: "downloads", label: "Downloads" },
  { id: "news", label: "News & Events" },
  { id: "contact", label: "Contact" },
  { id: "support", label: "Support" },
] satisfies Array<{ id: PageHeaderKey; label: string }>;

function updateArrayItem<T>(items: T[], index: number, value: T) {
  return items.map((item, itemIndex) => (itemIndex === index ? value : item));
}

function removeArrayItem<T>(items: T[], index: number) {
  return items.filter((_, itemIndex) => itemIndex !== index);
}

function slugifyAdminTarget(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "items";
}

function getAddTargetId(prefix: string, index: number) {
  return `${slugifyAdminTarget(prefix)}-${index}`;
}

function focusAddedItem(targetId?: string) {
  if (!targetId) {
    return;
  }

  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      const target = document.querySelector<HTMLElement>(
        `[data-admin-add-target="${targetId}"]`,
      );

      target?.scrollIntoView({ behavior: "smooth", block: "start" });
      target
        ?.querySelector<HTMLElement>("input, textarea, button")
        ?.focus({ preventScroll: true });
    });
  });
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block text-sm font-semibold text-brand-ink">
      <span>{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-md border border-brand-line bg-white px-3 py-2.5 text-sm font-medium text-brand-ink outline-none transition placeholder:text-brand-muted/60 focus:border-brand-burgundy focus:ring-2 focus:ring-brand-gold/40"
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <label className="block text-sm font-semibold text-brand-ink">
      <span>{label}</span>
      <textarea
        value={value}
        rows={rows}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full resize-y rounded-md border border-brand-line bg-white px-3 py-2.5 text-sm font-medium leading-6 text-brand-ink outline-none transition placeholder:text-brand-muted/60 focus:border-brand-burgundy focus:ring-2 focus:ring-brand-gold/40"
      />
    </label>
  );
}

function PanelTitle({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-col justify-between gap-4 border-b border-brand-line pb-5 sm:flex-row sm:items-end">
      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-brand-burgundy">
          {eyebrow}
        </p>
        <h2 className="mt-1 font-serif text-3xl font-semibold text-brand-ink">
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}

function AddButton({
  children,
  onClick,
  revealTargetId,
}: {
  children: ReactNode;
  onClick: () => void;
  revealTargetId?: string;
}) {
  const [justAdded, setJustAdded] = useState(false);
  const feedbackTimeoutRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (feedbackTimeoutRef.current) {
        window.clearTimeout(feedbackTimeoutRef.current);
      }
    },
    [],
  );

  function handleClick() {
    onClick();
    focusAddedItem(revealTargetId);
    setJustAdded(true);

    if (feedbackTimeoutRef.current) {
      window.clearTimeout(feedbackTimeoutRef.current);
    }

    feedbackTimeoutRef.current = window.setTimeout(() => {
      setJustAdded(false);
    }, 1400);
  }

  const Icon = justAdded ? CheckCircle2 : Plus;

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex min-h-11 min-w-24 items-center justify-center gap-2 rounded-md bg-brand-ink px-4 py-2 text-sm font-bold text-white transition hover:bg-brand-burgundy focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2"
    >
      <Icon className="h-4 w-4" />
      {justAdded ? "Added" : children}
    </button>
  );
}

function RemoveButton({ onClick, label = "Remove" }: { onClick: () => void; label?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-10 min-w-10 items-center justify-center gap-2 rounded-md border border-brand-line px-3 text-sm font-bold text-brand-burgundy transition hover:border-brand-burgundy hover:bg-brand-cream focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2"
    >
      <Trash2 className="h-4 w-4" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

function ImageField({
  csrfToken,
  label,
  value,
  onChange,
}: {
  csrfToken: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const id = useId();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function uploadImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/admin/upload", {
        headers: { "x-admin-csrf": csrfToken },
        method: "POST",
        body: formData,
      });
      const payload = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !payload.url) {
        throw new Error(payload.error ?? "Image upload failed.");
      }

      onChange(payload.url);
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Image upload failed.",
      );
    } finally {
      event.target.value = "";
      setUploading(false);
    }
  }

  return (
    <div className="grid gap-3">
      <Field label={label} value={value} onChange={onChange} />
      <div className="grid gap-3 sm:grid-cols-[180px_1fr] sm:items-start">
        <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-brand-line bg-brand-cream">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-brand-muted">
              <ImageIcon className="h-8 w-8" />
            </div>
          )}
        </div>
        <div className="grid gap-2">
          <input
            id={id}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            onChange={uploadImage}
            className="sr-only"
          />
          <label
            htmlFor={id}
            className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-md border border-brand-line bg-white px-4 py-2 text-sm font-bold text-brand-ink transition hover:border-brand-gold hover:bg-brand-cream focus-within:outline-none focus-within:ring-2 focus-within:ring-brand-gold focus-within:ring-offset-2"
          >
            {uploading ? <Upload className="h-4 w-4 animate-pulse" /> : <ImagePlus className="h-4 w-4" />}
            {uploading ? "Uploading" : "Upload image"}
          </label>
          {error ? (
            <p className="rounded-md bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">
              {error}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function AdminContentEditor({
  csrfToken,
  initialContent,
}: AdminContentEditorProps) {
  const router = useRouter();
  const [content, setContent] = useState(initialContent);
  const [lastSavedContent, setLastSavedContent] = useState(initialContent);
  const [activeTab, setActiveTab] = useState<TabId>("site");
  const [hasChanges, setHasChanges] = useState(false);
  const [status, setStatus] = useState<SaveStatus>({
    tone: "idle",
    message: "Ready",
  });

  const counts = useMemo(
    () => ({
      hero: content.home.heroSlides.length,
      gallery: content.gallery.images.length,
      news: content.news.items.length,
      pillars: content.academics.pillars.length,
    }),
    [content],
  );

  function updateContent(updater: (current: EditableContent) => EditableContent) {
    setHasChanges(true);
    setStatus({ tone: "idle", message: "Unsaved changes" });
    setContent(updater);
  }

  async function saveContent() {
    setStatus({ tone: "saving", message: "Saving changes" });

    try {
      const response = await fetch("/api/admin/content", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-csrf": csrfToken,
        },
        body: JSON.stringify(content),
      });
      const payload = (await response.json()) as {
        content?: EditableContent;
        error?: string;
      };

      if (!response.ok || !payload.content) {
        throw new Error(payload.error ?? "Content save failed.");
      }

      setContent(payload.content);
      setLastSavedContent(payload.content);
      setHasChanges(false);
      setStatus({ tone: "saved", message: "Saved" });
      router.refresh();
    } catch (saveError) {
      setStatus({
        tone: "error",
        message: saveError instanceof Error ? saveError.message : "Content save failed.",
      });
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", {
      headers: { "x-admin-csrf": csrfToken },
      method: "POST",
    });
    router.refresh();
  }

  function discardChanges() {
    setContent(lastSavedContent);
    setHasChanges(false);
    setStatus({ tone: "idle", message: "Unsaved changes discarded" });
  }

  const statusIcon =
    status.tone === "error" ? (
      <AlertTriangle className="h-4 w-4" />
    ) : status.tone === "saved" ? (
      <CheckCircle2 className="h-4 w-4" />
    ) : (
      <Save className="h-4 w-4" />
    );

  const statusClassName =
    status.tone === "error"
      ? "border-red-200 bg-red-50 text-red-700"
      : status.tone === "saved"
        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
        : "border-brand-line bg-white text-brand-muted";

  function renderSite() {
    return (
      <div className="grid gap-6">
        <PanelTitle eyebrow="Settings" title="School identity and contact" />
        <div className="grid gap-5 lg:grid-cols-2">
          <Field
            label="School name"
            value={content.site.name}
            onChange={(name) =>
              updateContent((current) => ({
                ...current,
                site: { ...current.site, name },
              }))
            }
          />
          <Field
            label="Tagline"
            value={content.site.tagline}
            onChange={(tagline) =>
              updateContent((current) => ({
                ...current,
                site: { ...current.site, tagline },
              }))
            }
          />
          <Field
            label="Website URL"
            value={content.site.url}
            onChange={(url) =>
              updateContent((current) => ({
                ...current,
                site: { ...current.site, url },
              }))
            }
          />
          <Field
            label="Email"
            value={content.site.contact.email}
            type="email"
            onChange={(email) =>
              updateContent((current) => ({
                ...current,
                site: {
                  ...current.site,
                  contact: { ...current.site.contact, email },
                },
              }))
            }
          />
        </div>
        <TextArea
          label="Site description"
          value={content.site.description}
          onChange={(description) =>
            updateContent((current) => ({
              ...current,
              site: { ...current.site, description },
            }))
          }
        />
        <div className="grid gap-6 lg:grid-cols-2">
            <ImageField
              csrfToken={csrfToken}
              label="Square logo path"
              value={content.site.logo}
              onChange={(logo) =>
              updateContent((current) => ({
                ...current,
                site: { ...current.site, logo },
              }))
            }
          />
            <ImageField
              csrfToken={csrfToken}
              label="Landscape logo path"
              value={content.site.logoLandscape}
              onChange={(logoLandscape) =>
              updateContent((current) => ({
                ...current,
                site: { ...current.site, logoLandscape },
              }))
            }
          />
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          <Field
            label="Address"
            value={content.site.contact.address}
            onChange={(address) =>
              updateContent((current) => ({
                ...current,
                site: {
                  ...current.site,
                  contact: { ...current.site.contact, address },
                },
              }))
            }
          />
          <Field
            label="Postal address"
            value={content.site.contact.postal}
            onChange={(postal) =>
              updateContent((current) => ({
                ...current,
                site: {
                  ...current.site,
                  contact: { ...current.site.contact, postal },
                },
              }))
            }
          />
          <Field
            label="Primary phone"
            value={content.site.contact.phonePrimary}
            onChange={(phonePrimary) =>
              updateContent((current) => ({
                ...current,
                site: {
                  ...current.site,
                  contact: { ...current.site.contact, phonePrimary },
                },
              }))
            }
          />
          <Field
            label="Secondary phone"
            value={content.site.contact.phoneSecondary}
            onChange={(phoneSecondary) =>
              updateContent((current) => ({
                ...current,
                site: {
                  ...current.site,
                  contact: { ...current.site.contact, phoneSecondary },
                },
              }))
            }
          />
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {(["facebook", "instagram", "youtube", "x"] as const).map((key) => (
            <Field
              key={key}
              label={`${key[0].toUpperCase()}${key.slice(1)} URL`}
              value={content.site.socials[key]}
              onChange={(value) =>
                updateContent((current) => ({
                  ...current,
                  site: {
                    ...current.site,
                    socials: { ...current.site.socials, [key]: value },
                  },
                }))
              }
            />
          ))}
        </div>
        <TextArea
          label="Google map embed URL"
          value={content.site.mapEmbed}
          rows={3}
          onChange={(mapEmbed) =>
            updateContent((current) => ({
              ...current,
              site: { ...current.site, mapEmbed },
            }))
          }
        />
        <div className="rounded-md border border-brand-line bg-brand-cream p-4">
          <h3 className="mb-1 font-serif text-xl font-semibold text-brand-ink">
            Live chat (Tawk.to)
          </h3>
          <p className="mb-4 text-sm text-brand-muted">
            Paste your Tawk.to embed URL or the full widget script to show a
            live chat bubble on every page. Find it in your{" "}
            <a
              href="https://dashboard.tawk.to"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand-burgundy underline underline-offset-2"
            >
              Tawk.to dashboard
            </a>{" "}
            under Administration &gt; Channels &gt; Chat Widget. The widget URL
            looks like:{" "}
            <code className="rounded bg-white px-1.5 py-0.5 text-xs font-bold text-brand-ink">
              https://embed.tawk.to/PROPERTY_ID/WIDGET_ID
            </code>
          </p>
          <TextArea
            label="Tawk.to widget embed"
            value={content.site.tawkEmbedUrl}
            placeholder="Paste https://embed.tawk.to/PROPERTY_ID/WIDGET_ID or the full Tawk.to script code"
            rows={4}
            onChange={(tawkEmbedUrl) =>
              updateContent((current) => ({
                ...current,
                site: { ...current.site, tawkEmbedUrl },
              }))
            }
          />
        </div>
      </div>
    );
  }

  function renderPages() {
    return (
      <div className="grid gap-6">
        <PanelTitle eyebrow="Pages" title="Page headers and contact intro" />
        <div className="grid gap-4">
          {pageHeaderConfigs.map((page) => (
            <article
              key={page.id}
              className="rounded-md border border-brand-line bg-brand-cream p-4"
            >
              <h3 className="mb-4 font-serif text-xl font-semibold text-brand-ink">
                {page.label} page header
              </h3>
              <PageHeaderEditor
                csrfToken={csrfToken}
                header={content.pages[page.id]}
                onChange={(header) =>
                  updateContent((current) => ({
                    ...current,
                    pages: { ...current.pages, [page.id]: header },
                  }))
                }
              />
            </article>
          ))}
        </div>
        <article className="rounded-md border border-brand-line bg-brand-cream p-4">
          <h3 className="mb-4 font-serif text-xl font-semibold text-brand-ink">
            Contact page intro
          </h3>
          <SectionIntroEditor
            intro={content.contact.sectionIntro}
            onChange={(sectionIntro) =>
              updateContent((current) => ({
                ...current,
                contact: { ...current.contact, sectionIntro },
              }))
            }
          />
        </article>
        <div className="grid gap-4">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-serif text-2xl font-semibold text-brand-ink">
              Additional pages
            </h3>
            <AddButton
              revealTargetId={getAddTargetId(
                "pages-additional-pages",
                content.pages.comingSoon.length,
              )}
              onClick={() =>
                updateContent((current) => ({
                  ...current,
                  pages: {
                    ...current.pages,
                    comingSoon: [
                      ...current.pages.comingSoon,
                      {
                        slug: "new-page",
                        eyebrow: "Page",
                        title: "New page",
                        description: "Add page description.",
                        needed: "Add page body text.",
                        image: "/images/resource-centre.jpeg",
                      },
                    ],
                  },
                }))
              }
            >
              Page
            </AddButton>
          </div>
          {content.pages.comingSoon.map((page, index) => (
            <article
              key={`${page.slug}-${index}`}
              data-admin-add-target={getAddTargetId("pages-additional-pages", index)}
              className="rounded-md border border-brand-line bg-brand-cream p-4"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <h4 className="font-serif text-xl font-semibold text-brand-ink">
                  /{page.slug}
                </h4>
                <RemoveButton
                  onClick={() =>
                    updateContent((current) => ({
                      ...current,
                      pages: {
                        ...current.pages,
                        comingSoon: removeArrayItem(
                          current.pages.comingSoon,
                          index,
                        ),
                      },
                    }))
                  }
                />
              </div>
              <ComingSoonPageEditor
                csrfToken={csrfToken}
                page={page}
                onChange={(nextPage) =>
                  updateContent((current) => ({
                    ...current,
                    pages: {
                      ...current.pages,
                      comingSoon: updateArrayItem(
                        current.pages.comingSoon,
                        index,
                        nextPage,
                      ),
                    },
                  }))
                }
              />
            </article>
          ))}
        </div>
      </div>
    );
  }

  function renderAbout() {
    return (
      <div className="grid gap-6">
        <PanelTitle eyebrow="About" title="About page content" />
        <article className="rounded-md border border-brand-line bg-brand-cream p-4">
          <h3 className="mb-4 font-serif text-xl font-semibold text-brand-ink">
            School overview
          </h3>
          <div className="grid gap-5">
            <div className="grid gap-5 lg:grid-cols-2">
              <Field
                label="Eyebrow"
                value={content.about.overview.eyebrow}
                onChange={(eyebrow) =>
                  updateContent((current) => ({
                    ...current,
                    about: {
                      ...current.about,
                      overview: { ...current.about.overview, eyebrow },
                    },
                  }))
                }
              />
              <Field
                label="Title"
                value={content.about.overview.title}
                onChange={(title) =>
                  updateContent((current) => ({
                    ...current,
                    about: {
                      ...current.about,
                      overview: { ...current.about.overview, title },
                    },
                  }))
                }
              />
            </div>
            <StringListEditor
              title="Overview paragraphs"
              items={content.about.overview.paragraphs}
              onAdd={() =>
                updateContent((current) => ({
                  ...current,
                  about: {
                    ...current.about,
                    overview: {
                      ...current.about.overview,
                      paragraphs: [
                        ...current.about.overview.paragraphs,
                        "New paragraph",
                      ],
                    },
                  },
                }))
              }
              onChange={(paragraphs) =>
                updateContent((current) => ({
                  ...current,
                  about: {
                    ...current.about,
                    overview: { ...current.about.overview, paragraphs },
                  },
                }))
              }
            />
            <ImageField
              csrfToken={csrfToken}
              label="Overview image"
              value={content.about.overview.image}
              onChange={(image) =>
                updateContent((current) => ({
                  ...current,
                  about: {
                    ...current.about,
                    overview: { ...current.about.overview, image },
                  },
                }))
              }
            />
            <Field
              label="Overview image alt text"
              value={content.about.overview.imageAlt}
              onChange={(imageAlt) =>
                updateContent((current) => ({
                  ...current,
                  about: {
                    ...current.about,
                    overview: { ...current.about.overview, imageAlt },
                  },
                }))
              }
            />
          </div>
        </article>
        <div className="grid gap-4 lg:grid-cols-2">
          <TextArea
            label="Vision"
            value={content.about.vision}
            onChange={(vision) =>
              updateContent((current) => ({
                ...current,
                about: { ...current.about, vision },
              }))
            }
          />
          <TextArea
            label="Mission"
            value={content.about.mission}
            onChange={(mission) =>
              updateContent((current) => ({
                ...current,
                about: { ...current.about, mission },
              }))
            }
          />
        </div>
        <ValuesEditor
          items={content.about.values}
          onAdd={() =>
            updateContent((current) => ({
              ...current,
              about: {
                ...current.about,
                values: [...current.about.values, { letter: "N", label: "New value" }],
              },
            }))
          }
          onChange={(valuesItems) =>
            updateContent((current) => ({
              ...current,
              about: { ...current.about, values: valuesItems },
            }))
          }
        />
        <article className="rounded-md border border-brand-line bg-brand-cream p-4">
          <h3 className="mb-4 font-serif text-xl font-semibold text-brand-ink">
            Architectural concept
          </h3>
          <div className="grid gap-5">
            <div className="grid gap-5 lg:grid-cols-2">
              <Field
                label="Eyebrow"
                value={content.about.architecture.eyebrow}
                onChange={(eyebrow) =>
                  updateContent((current) => ({
                    ...current,
                    about: {
                      ...current.about,
                      architecture: { ...current.about.architecture, eyebrow },
                    },
                  }))
                }
              />
              <Field
                label="Title"
                value={content.about.architecture.title}
                onChange={(title) =>
                  updateContent((current) => ({
                    ...current,
                    about: {
                      ...current.about,
                      architecture: { ...current.about.architecture, title },
                    },
                  }))
                }
              />
            </div>
            <TextArea
              label="Description"
              value={content.about.architecture.description}
              onChange={(description) =>
                updateContent((current) => ({
                  ...current,
                  about: {
                    ...current.about,
                    architecture: {
                      ...current.about.architecture,
                      description,
                    },
                  },
                }))
              }
            />
            <ImageField
              csrfToken={csrfToken}
              label="Image"
              value={content.about.architecture.image}
              onChange={(image) =>
                updateContent((current) => ({
                  ...current,
                  about: {
                    ...current.about,
                    architecture: { ...current.about.architecture, image },
                  },
                }))
              }
            />
            <Field
              label="Image alt text"
              value={content.about.architecture.imageAlt}
              onChange={(imageAlt) =>
                updateContent((current) => ({
                  ...current,
                  about: {
                    ...current.about,
                    architecture: {
                      ...current.about.architecture,
                      imageAlt,
                    },
                  },
                }))
              }
            />
          </div>
        </article>
      </div>
    );
  }

  function renderHome() {
    return (
      <div className="grid gap-6">
        <PanelTitle eyebrow="Home" title="Homepage content">
          <AddButton
            revealTargetId={getAddTargetId(
              "home-hero-slides",
              content.home.heroSlides.length,
            )}
            onClick={() =>
              updateContent((current) => ({
                ...current,
                home: {
                  ...current.home,
                  heroSlides: [
                    ...current.home.heroSlides,
                    {
                      eyebrow: "Merishaw School",
                      title: "New homepage slide",
                      description: "Add the slide description.",
                      image: "/images/hero-tuition-block.png",
                      alt: "Merishaw School",
                      imagePosition: "center center",
                    },
                  ],
                },
              }))
            }
          >
            Hero slide
          </AddButton>
        </PanelTitle>
        <div className="grid gap-4">
          {content.home.heroSlides.map((slide, index) => (
            <article
              key={`${slide.title}-${index}`}
              data-admin-add-target={getAddTargetId("home-hero-slides", index)}
              className="rounded-md border border-brand-line bg-brand-cream p-4"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="font-serif text-2xl font-semibold text-brand-ink">
                  Hero slide {index + 1}
                </h3>
                <RemoveButton
                  onClick={() =>
                    updateContent((current) => ({
                      ...current,
                      home: {
                        ...current.home,
                        heroSlides: removeArrayItem(current.home.heroSlides, index),
                      },
                    }))
                  }
                />
              </div>
              <SlideEditor
                csrfToken={csrfToken}
                slide={slide}
                onChange={(nextSlide) =>
                  updateContent((current) => ({
                    ...current,
                    home: {
                      ...current.home,
                      heroSlides: updateArrayItem(
                        current.home.heroSlides,
                        index,
                        nextSlide,
                      ),
                    },
                  }))
                }
              />
            </article>
          ))}
        </div>
        <StatsEditor
          title="Top stats"
          items={content.home.stats}
          onAdd={() =>
            updateContent((current) => ({
              ...current,
              home: {
                ...current.home,
                stats: [...current.home.stats, { value: "New stat", label: "Label" }],
              },
            }))
          }
          onChange={(items) =>
            updateContent((current) => ({
              ...current,
              home: { ...current.home, stats: items },
            }))
          }
        />
        <StatsEditor
          title="Who we are highlights"
          items={content.home.highlights}
          onAdd={() =>
            updateContent((current) => ({
              ...current,
              home: {
                ...current.home,
                highlights: [
                  ...current.home.highlights,
                  { value: "New highlight", label: "Label" },
                ],
              },
            }))
          }
          onChange={(items) =>
            updateContent((current) => ({
              ...current,
              home: { ...current.home, highlights: items },
            }))
          }
        />
        <TextCardEditor
          title="Why choose Merishaw"
          items={content.home.whyChoose}
          onAdd={() =>
            updateContent((current) => ({
              ...current,
              home: {
                ...current.home,
                whyChoose: [
                  ...current.home.whyChoose,
                  { title: "New reason", description: "Add the reason details." },
                ],
              },
            }))
          }
          onChange={(items) =>
            updateContent((current) => ({
              ...current,
              home: { ...current.home, whyChoose: items },
            }))
          }
        />
      </div>
    );
  }

  function renderAcademics() {
    return (
      <div className="grid gap-6">
        <PanelTitle eyebrow="Academics" title="Programs, pillars, and facilities" />
        <ProgramEditor
          items={content.academics.programs}
          onAdd={() =>
            updateContent((current) => ({
              ...current,
              academics: {
                ...current.academics,
                programs: [
                  ...current.academics.programs,
                  {
                    title: "New program",
                    eyebrow: "Category",
                    description: "Add program description.",
                  },
                ],
              },
            }))
          }
          onChange={(items) =>
            updateContent((current) => ({
              ...current,
              academics: { ...current.academics, programs: items },
            }))
          }
        />
        <StringListEditor
          title="CBE pathways"
          items={content.academics.cbePathways}
          onAdd={() =>
            updateContent((current) => ({
              ...current,
              academics: {
                ...current.academics,
                cbePathways: [...current.academics.cbePathways, "New pathway"],
              },
            }))
          }
          onChange={(items) =>
            updateContent((current) => ({
              ...current,
              academics: { ...current.academics, cbePathways: items },
            }))
          }
        />
        <StringListEditor
          title="Core competencies"
          items={content.academics.cbeCompetencies}
          onAdd={() =>
            updateContent((current) => ({
              ...current,
              academics: {
                ...current.academics,
                cbeCompetencies: [
                  ...current.academics.cbeCompetencies,
                  "New competency",
                ],
              },
            }))
          }
          onChange={(items) =>
            updateContent((current) => ({
              ...current,
              academics: { ...current.academics, cbeCompetencies: items },
            }))
          }
        />
        <div className="grid gap-4">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-serif text-2xl font-semibold text-brand-ink">
              Pillars
            </h3>
            <AddButton
              revealTargetId={getAddTargetId(
                "academics-pillars",
                content.academics.pillars.length,
              )}
              onClick={() =>
                updateContent((current) => ({
                  ...current,
                  academics: {
                    ...current.academics,
                    pillars: [
                      ...current.academics.pillars,
                      {
                        title: "New pillar",
                        image: "/images/pillar-stem.jpg",
                        imageAlt: "Merishaw School",
                        description: "Add pillar description.",
                      },
                    ],
                  },
                }))
              }
            >
              Pillar
            </AddButton>
          </div>
          {content.academics.pillars.map((pillar, index) => (
            <article
              key={`${pillar.title}-${index}`}
              data-admin-add-target={getAddTargetId("academics-pillars", index)}
              className="rounded-md border border-brand-line bg-brand-cream p-4"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <h4 className="font-serif text-xl font-semibold text-brand-ink">
                  Pillar {index + 1}
                </h4>
                <RemoveButton
                  onClick={() =>
                    updateContent((current) => ({
                      ...current,
                      academics: {
                        ...current.academics,
                        pillars: removeArrayItem(current.academics.pillars, index),
                      },
                    }))
                  }
                />
              </div>
              <PillarEditor
                csrfToken={csrfToken}
                pillar={pillar}
                onChange={(nextPillar) =>
                  updateContent((current) => ({
                    ...current,
                    academics: {
                      ...current.academics,
                      pillars: updateArrayItem(
                        current.academics.pillars,
                        index,
                        nextPillar,
                      ),
                    },
                  }))
                }
              />
            </article>
          ))}
        </div>
        <StringListEditor
          title="Facilities"
          items={content.academics.facilities}
          onAdd={() =>
            updateContent((current) => ({
              ...current,
              academics: {
                ...current.academics,
                facilities: [...current.academics.facilities, "New facility"],
              },
            }))
          }
          onChange={(items) =>
            updateContent((current) => ({
              ...current,
              academics: { ...current.academics, facilities: items },
            }))
          }
        />
      </div>
    );
  }

  function renderAdmissions() {
    return (
      <div className="grid gap-6">
        <PanelTitle eyebrow="Admissions" title="Admissions page content" />
        <article className="rounded-md border border-brand-line bg-brand-cream p-4">
          <h3 className="mb-4 font-serif text-xl font-semibold text-brand-ink">
            Application enquiry intro
          </h3>
          <SectionIntroEditor
            intro={content.admissions.applicationIntro}
            onChange={(applicationIntro) =>
              updateContent((current) => ({
                ...current,
                admissions: { ...current.admissions, applicationIntro },
              }))
            }
          />
        </article>
        <StringListEditor
          title="Application fields"
          items={content.admissions.applicationFields}
          onAdd={() =>
            updateContent((current) => ({
              ...current,
              admissions: {
                ...current.admissions,
                applicationFields: [
                  ...current.admissions.applicationFields,
                  "New application field",
                ],
              },
            }))
          }
          onChange={(applicationFields) =>
            updateContent((current) => ({
              ...current,
              admissions: { ...current.admissions, applicationFields },
            }))
          }
        />
        <article className="rounded-md border border-brand-line bg-brand-cream p-4">
          <h3 className="mb-4 font-serif text-xl font-semibold text-brand-ink">
            Process intro
          </h3>
          <SectionIntroEditor
            intro={content.admissions.processIntro}
            onChange={(processIntro) =>
              updateContent((current) => ({
                ...current,
                admissions: { ...current.admissions, processIntro },
              }))
            }
          />
          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            <Field
              label="Preparation card title"
              value={content.admissions.processPrepTitle}
              onChange={(processPrepTitle) =>
                updateContent((current) => ({
                  ...current,
                  admissions: { ...current.admissions, processPrepTitle },
                }))
              }
            />
            <TextArea
              label="Preparation card text"
              value={content.admissions.processPrepDescription}
              rows={3}
              onChange={(processPrepDescription) =>
                updateContent((current) => ({
                  ...current,
                  admissions: {
                    ...current.admissions,
                    processPrepDescription,
                  },
                }))
              }
            />
          </div>
        </article>
        <AdmissionsStepsEditor
          items={content.admissions.process}
          onAdd={() =>
            updateContent((current) => ({
              ...current,
              admissions: {
                ...current.admissions,
                process: [
                  ...current.admissions.process,
                  {
                    step: String(current.admissions.process.length + 1).padStart(
                      2,
                      "0",
                    ),
                    title: "New step",
                    description: "Add admissions step details.",
                    note: "Add a short note.",
                  },
                ],
              },
            }))
          }
          onChange={(process) =>
            updateContent((current) => ({
              ...current,
              admissions: { ...current.admissions, process },
            }))
          }
        />
        <div className="grid gap-5 rounded-md border border-brand-line bg-brand-cream p-4 lg:grid-cols-2">
          <Field
            label="Fees CTA eyebrow"
            value={content.admissions.feesEyebrow}
            onChange={(feesEyebrow) =>
              updateContent((current) => ({
                ...current,
                admissions: { ...current.admissions, feesEyebrow },
              }))
            }
          />
          <Field
            label="Fees CTA title"
            value={content.admissions.feesTitle}
            onChange={(feesTitle) =>
              updateContent((current) => ({
                ...current,
                admissions: { ...current.admissions, feesTitle },
              }))
            }
          />
        </div>
      </div>
    );
  }

  function renderDownloads() {
    return (
      <div className="grid gap-6">
        <PanelTitle eyebrow="Downloads" title="Downloads page content" />
        <article className="rounded-md border border-brand-line bg-brand-cream p-4">
          <h3 className="mb-4 font-serif text-xl font-semibold text-brand-ink">
            Documents section intro
          </h3>
          <SectionIntroEditor
            intro={content.downloads.sectionIntro}
            onChange={(sectionIntro) =>
              updateContent((current) => ({
                ...current,
                downloads: { ...current.downloads, sectionIntro },
              }))
            }
          />
        </article>
        <DownloadItemsEditor
          items={content.downloads.items}
          onAdd={() =>
            updateContent((current) => ({
              ...current,
              downloads: {
                ...current.downloads,
                items: [
                  ...current.downloads.items,
                  {
                    title: "New document",
                    description: "Add document description.",
                    href: "/docs/file.pdf",
                    type: "PDF",
                    isLocal: true,
                  },
                ],
              },
            }))
          }
          onChange={(items) =>
            updateContent((current) => ({
              ...current,
              downloads: { ...current.downloads, items },
            }))
          }
        />
        <TextArea
          label="Downloads page note"
          value={content.downloads.note}
          rows={3}
          onChange={(note) =>
            updateContent((current) => ({
              ...current,
              downloads: { ...current.downloads, note },
            }))
          }
        />
      </div>
    );
  }

  function renderGallery() {
    return (
      <div className="grid gap-6">
        <PanelTitle eyebrow="Gallery" title="Pictures and showcase slides">
          <AddButton
            revealTargetId={getAddTargetId(
              "gallery-pictures",
              content.gallery.images.length,
            )}
            onClick={() =>
              updateContent((current) => ({
                ...current,
                gallery: {
                  ...current.gallery,
                  images: [
                    ...current.gallery.images,
                    {
                      src: "/images/gallery-campus-view.jpg",
                      alt: "Merishaw School",
                      category: "Campus",
                    },
                  ],
                },
              }))
            }
          >
            Picture
          </AddButton>
        </PanelTitle>
        <div className="grid gap-4">
          {content.gallery.images.map((image, index) => (
            <article
              key={`${image.src}-${index}`}
              data-admin-add-target={getAddTargetId("gallery-pictures", index)}
              className="rounded-md border border-brand-line bg-brand-cream p-4"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="font-serif text-xl font-semibold text-brand-ink">
                  Picture {index + 1}
                </h3>
                <RemoveButton
                  onClick={() =>
                    updateContent((current) => ({
                      ...current,
                      gallery: {
                        ...current.gallery,
                        images: removeArrayItem(current.gallery.images, index),
                      },
                    }))
                  }
                />
              </div>
              <GalleryImageEditor
                csrfToken={csrfToken}
                image={image}
                onChange={(nextImage) =>
                  updateContent((current) => ({
                    ...current,
                    gallery: {
                      ...current.gallery,
                      images: updateArrayItem(
                        current.gallery.images,
                        index,
                        nextImage,
                      ),
                    },
                  }))
                }
              />
            </article>
          ))}
        </div>
        <div className="grid gap-4">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-serif text-2xl font-semibold text-brand-ink">
              Showcase slides
            </h3>
            <AddButton
              revealTargetId={getAddTargetId(
                "gallery-showcase-slides",
                content.gallery.showcaseSlides.length,
              )}
              onClick={() =>
                updateContent((current) => ({
                  ...current,
                  gallery: {
                    ...current.gallery,
                    showcaseSlides: [
                      ...current.gallery.showcaseSlides,
                      {
                        eyebrow: "Campus",
                        title: "New showcase slide",
                        description: "Add the slide description.",
                        image: "/images/gallery-aerial-campus.jpg",
                        alt: "Merishaw School",
                      },
                    ],
                  },
                }))
              }
            >
              Slide
            </AddButton>
          </div>
          {content.gallery.showcaseSlides.map((slide, index) => (
            <article
              key={`${slide.title}-${index}`}
              data-admin-add-target={getAddTargetId(
                "gallery-showcase-slides",
                index,
              )}
              className="rounded-md border border-brand-line bg-brand-cream p-4"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <h4 className="font-serif text-xl font-semibold text-brand-ink">
                  Showcase slide {index + 1}
                </h4>
                <RemoveButton
                  onClick={() =>
                    updateContent((current) => ({
                      ...current,
                      gallery: {
                        ...current.gallery,
                        showcaseSlides: removeArrayItem(
                          current.gallery.showcaseSlides,
                          index,
                        ),
                      },
                    }))
                  }
                />
              </div>
              <SlideEditor
                csrfToken={csrfToken}
                slide={slide}
                onChange={(nextSlide) =>
                  updateContent((current) => ({
                    ...current,
                    gallery: {
                      ...current.gallery,
                      showcaseSlides: updateArrayItem(
                        current.gallery.showcaseSlides,
                        index,
                        nextSlide,
                      ),
                    },
                  }))
                }
              />
            </article>
          ))}
        </div>
      </div>
    );
  }

  function renderNews() {
    return (
      <div className="grid gap-6">
        <PanelTitle eyebrow="News & Events" title="School updates">
          <AddButton
            revealTargetId={getAddTargetId("news-updates", content.news.items.length)}
            onClick={() =>
              updateContent((current) => ({
                ...current,
                news: {
                  items: [
                    ...current.news.items,
                    {
                      title: "New update",
                      date: "School news",
                      image: "/images/news-stem.jpg",
                      excerpt: "Add news summary.",
                      category: "News",
                    },
                  ],
                },
              }))
            }
          >
            Update
          </AddButton>
        </PanelTitle>
        <div className="grid gap-4">
          {content.news.items.map((item, index) => (
            <article
              key={`${item.title}-${index}`}
              data-admin-add-target={getAddTargetId("news-updates", index)}
              className="rounded-md border border-brand-line bg-brand-cream p-4"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="font-serif text-xl font-semibold text-brand-ink">
                  Update {index + 1}
                </h3>
                <RemoveButton
                  onClick={() =>
                    updateContent((current) => ({
                      ...current,
                      news: {
                        items: removeArrayItem(current.news.items, index),
                      },
                    }))
                  }
                />
              </div>
              <NewsEditor
                csrfToken={csrfToken}
                item={item}
                onChange={(nextItem) =>
                  updateContent((current) => ({
                    ...current,
                    news: {
                      items: updateArrayItem(current.news.items, index, nextItem),
                    },
                  }))
                }
              />
            </article>
          ))}
        </div>
      </div>
    );
  }

  function renderLeadership() {
    return (
      <div className="grid gap-6">
        <PanelTitle eyebrow="Leadership" title="Leadership content" />
        <article className="rounded-md border border-brand-line bg-brand-cream p-4">
          <h3 className="mb-4 font-serif text-xl font-semibold text-brand-ink">
            Leadership page hero
          </h3>
          <PageHeaderEditor
            csrfToken={csrfToken}
            header={content.pages.leadership}
            onChange={(leadership) =>
              updateContent((current) => ({
                ...current,
                pages: { ...current.pages, leadership },
              }))
            }
          />
        </article>
        <LeadershipPeopleEditor
          csrfToken={csrfToken}
          title="Board Members"
          addLabel="Board member"
          items={content.leadership.boardMembers}
          newItem={{
            name: "New board member",
            role: "Board Member",
            image: "/images/resource-centre.jpeg",
            description: "Add board member profile.",
          }}
          onChange={(boardMembers) =>
            updateContent((current) => ({
              ...current,
              leadership: { ...current.leadership, boardMembers },
            }))
          }
        />
        <div className="grid gap-4">
          <h3 className="font-serif text-2xl font-semibold text-brand-ink">
            Principal
          </h3>
          <article className="rounded-md border border-brand-line bg-brand-cream p-4">
            <LeadershipPersonEditor
              csrfToken={csrfToken}
              person={content.leadership.principal}
              noteLabel="Principal welcome / leadership note"
              onChange={(principal) =>
                updateContent((current) => ({
                  ...current,
                  leadership: { ...current.leadership, principal },
                }))
              }
            />
          </article>
        </div>
        <LeadershipPeopleEditor
          csrfToken={csrfToken}
          title="Senior Management Team"
          addLabel="Manager"
          items={content.leadership.seniorManagement}
          newItem={{
            name: "New senior manager",
            role: "Senior Management",
            image: "/images/gallery-parade-grounds.png",
            description: "Add senior management profile.",
          }}
          onChange={(seniorManagement) =>
            updateContent((current) => ({
              ...current,
              leadership: { ...current.leadership, seniorManagement },
            }))
          }
        />
        <LeadershipPeopleEditor
          csrfToken={csrfToken}
          title="Student Council"
          addLabel="Council member"
          items={content.leadership.studentCouncil}
          newItem={{
            name: "New student council member",
            role: "Student Council",
            image: "/images/gallery-student-life-2.jpg",
            description: "Add student council profile.",
          }}
          onChange={(studentCouncil) =>
            updateContent((current) => ({
              ...current,
              leadership: { ...current.leadership, studentCouncil },
            }))
          }
        />
        <LeadershipPeopleEditor
          csrfToken={csrfToken}
          title="Student Leadership / Student Leaders"
          addLabel="Student leader"
          items={content.leadership.studentLeaders}
          newItem={{
            name: "New student leader",
            role: "Student Leader",
            image: "/images/gallery-student-life-3.jpg",
            description: "Add student leader profile.",
          }}
          onChange={(studentLeaders) =>
            updateContent((current) => ({
              ...current,
              leadership: { ...current.leadership, studentLeaders },
            }))
          }
        />
      </div>
    );
  }

  function renderSupport() {
    return (
      <div className="grid gap-6">
        <PanelTitle eyebrow="Support" title="Sponsorship and CSR content" />
        <div className="grid gap-5">
          <Field
            label="Support title"
            value={content.support.content.title}
            onChange={(title) =>
              updateContent((current) => ({
                ...current,
                support: {
                  ...current.support,
                  content: { ...current.support.content, title },
                },
              }))
            }
          />
          <TextArea
            label="Support description"
            value={content.support.content.description}
            onChange={(description) =>
              updateContent((current) => ({
                ...current,
                support: {
                  ...current.support,
                  content: { ...current.support.content, description },
                },
              }))
            }
          />
          <TextArea
            label="Support note"
            value={content.support.content.note}
            rows={3}
            onChange={(note) =>
              updateContent((current) => ({
                ...current,
                support: {
                  ...current.support,
                  content: { ...current.support.content, note },
                },
              }))
            }
          />
        </div>
        <StringListEditor
          title="CSR initiatives"
          items={content.support.initiatives}
          onAdd={() =>
            updateContent((current) => ({
              ...current,
              support: {
                ...current.support,
                initiatives: [...current.support.initiatives, "New initiative"],
              },
            }))
          }
          onChange={(items) =>
            updateContent((current) => ({
              ...current,
              support: { ...current.support, initiatives: items },
            }))
          }
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-cream">
      <section className="bg-brand-ink px-4 py-10 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-brand-gold">
              Merishaw Admin
            </p>
            <h1 className="mt-2 font-serif text-4xl font-semibold leading-tight sm:text-5xl">
              Website content manager
            </h1>
          </div>
          <div className="grid gap-2 sm:grid-cols-4 lg:min-w-[520px]">
            <div className="rounded-md border border-white/15 bg-white/10 p-3">
              <p className="text-2xl font-bold">{counts.hero}</p>
              <p className="text-xs font-semibold uppercase text-white/70">
                Hero slides
              </p>
            </div>
            <div className="rounded-md border border-white/15 bg-white/10 p-3">
              <p className="text-2xl font-bold">{counts.gallery}</p>
              <p className="text-xs font-semibold uppercase text-white/70">
                Pictures
              </p>
            </div>
            <div className="rounded-md border border-white/15 bg-white/10 p-3">
              <p className="text-2xl font-bold">{counts.news}</p>
              <p className="text-xs font-semibold uppercase text-white/70">
                Updates
              </p>
            </div>
            <div className="rounded-md border border-white/15 bg-white/10 p-3">
              <p className="text-2xl font-bold">{counts.pillars}</p>
              <p className="text-xs font-semibold uppercase text-white/70">
                Pillars
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[240px_1fr]">
          <aside className="h-fit rounded-md border border-brand-line bg-white p-3 shadow-card">
            <nav aria-label="Admin sections" className="grid gap-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = tab.id === activeTab;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex min-h-11 items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2",
                      isActive
                        ? "bg-brand-burgundy text-white"
                        : "text-brand-ink hover:bg-brand-cream",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </aside>

          <div className="grid min-w-0 gap-4">
            <div className="grid gap-3 rounded-md border border-brand-line bg-white p-4 shadow-card lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
                <div>
                  <p className="text-sm font-bold text-brand-ink">
                    Authenticated admin session
                  </p>
                  <p className="mt-1 text-xs font-semibold uppercase text-brand-muted">
                    Changes save through your signed browser session
                  </p>
                </div>
                <div
                  aria-live="polite"
                  className={cn(
                    "inline-flex min-h-11 items-center gap-2 rounded-md border px-3 py-2 text-sm font-bold",
                    statusClassName,
                  )}
                >
                  {statusIcon}
                  {status.message}
                  {hasChanges ? <span className="text-brand-burgundy">Unsaved</span> : null}
                </div>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row lg:justify-end">
                <button
                  type="button"
                  onClick={discardChanges}
                  disabled={!hasChanges || status.tone === "saving"}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-brand-line px-4 py-2 text-sm font-bold text-brand-ink transition hover:border-brand-gold hover:bg-brand-cream focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-45"
                >
                  <RotateCcw className="h-4 w-4" />
                  Discard
                </button>
                <button
                  type="button"
                  onClick={saveContent}
                  disabled={status.tone === "saving"}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-brand-burgundy px-5 py-2 text-sm font-bold text-white transition hover:bg-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 disabled:cursor-wait disabled:opacity-70"
                >
                  <Save className="h-4 w-4" />
                  {status.tone === "saving" ? "Saving" : "Save changes"}
                </button>
                <button
                  type="button"
                  onClick={logout}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-brand-line px-4 py-2 text-sm font-bold text-brand-ink transition hover:border-brand-burgundy hover:bg-brand-cream focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </div>

            <div className="rounded-md border border-brand-line bg-white p-5 shadow-card sm:p-6">
              {activeTab === "site" ? renderSite() : null}
              {activeTab === "pages" ? renderPages() : null}
              {activeTab === "about" ? renderAbout() : null}
              {activeTab === "home" ? renderHome() : null}
              {activeTab === "academics" ? renderAcademics() : null}
              {activeTab === "admissions" ? renderAdmissions() : null}
              {activeTab === "gallery" ? renderGallery() : null}
              {activeTab === "downloads" ? renderDownloads() : null}
              {activeTab === "news" ? renderNews() : null}
              {activeTab === "leadership" ? renderLeadership() : null}
              {activeTab === "support" ? renderSupport() : null}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function PageHeaderEditor({
  csrfToken,
  header,
  onChange,
}: {
  csrfToken: string;
  header: EditablePageHeader;
  onChange: (header: EditablePageHeader) => void;
}) {
  return (
    <div className="grid gap-5">
      <div className="grid gap-5 lg:grid-cols-2">
        <Field
          label="Eyebrow"
          value={header.eyebrow}
          onChange={(eyebrow) => onChange({ ...header, eyebrow })}
        />
        <Field
          label="Title"
          value={header.title}
          onChange={(title) => onChange({ ...header, title })}
        />
      </div>
      <TextArea
        label="Description"
        value={header.description}
        onChange={(description) => onChange({ ...header, description })}
      />
      <ImageField
        csrfToken={csrfToken}
        label="Header image"
        value={header.image}
        onChange={(image) => onChange({ ...header, image })}
      />
    </div>
  );
}

function SectionIntroEditor({
  intro,
  onChange,
}: {
  intro: EditableSectionIntro;
  onChange: (intro: EditableSectionIntro) => void;
}) {
  return (
    <div className="grid gap-5">
      <div className="grid gap-5 lg:grid-cols-2">
        <Field
          label="Eyebrow"
          value={intro.eyebrow}
          onChange={(eyebrow) => onChange({ ...intro, eyebrow })}
        />
        <Field
          label="Title"
          value={intro.title}
          onChange={(title) => onChange({ ...intro, title })}
        />
      </div>
      <TextArea
        label="Description"
        value={intro.description}
        onChange={(description) => onChange({ ...intro, description })}
      />
    </div>
  );
}

function ComingSoonPageEditor({
  csrfToken,
  page,
  onChange,
}: {
  csrfToken: string;
  page: EditableComingSoonPage;
  onChange: (page: EditableComingSoonPage) => void;
}) {
  return (
    <div className="grid gap-5">
      <div className="grid gap-5 lg:grid-cols-2">
        <Field
          label="Slug"
          value={page.slug}
          onChange={(slug) => onChange({ ...page, slug })}
        />
        <Field
          label="Eyebrow"
          value={page.eyebrow}
          onChange={(eyebrow) => onChange({ ...page, eyebrow })}
        />
      </div>
      <Field
        label="Title"
        value={page.title}
        onChange={(title) => onChange({ ...page, title })}
      />
      <TextArea
        label="Description"
        value={page.description}
        onChange={(description) => onChange({ ...page, description })}
      />
      <TextArea
        label="Page body / coming soon text"
        value={page.needed}
        onChange={(needed) => onChange({ ...page, needed })}
      />
      <ImageField
        csrfToken={csrfToken}
        label="Header image"
        value={page.image}
        onChange={(image) => onChange({ ...page, image })}
      />
    </div>
  );
}

function SlideEditor({
  csrfToken,
  slide,
  onChange,
}: {
  csrfToken: string;
  slide: EditableSlide;
  onChange: (slide: EditableSlide) => void;
}) {
  return (
    <div className="grid gap-5">
      <div className="grid gap-5 lg:grid-cols-2">
        <Field
          label="Eyebrow"
          value={slide.eyebrow ?? ""}
          onChange={(eyebrow) => onChange({ ...slide, eyebrow })}
        />
        <Field
          label="Image position"
          value={slide.imagePosition ?? "center center"}
          onChange={(imagePosition) => onChange({ ...slide, imagePosition })}
        />
      </div>
      <Field
        label="Title"
        value={slide.title}
        onChange={(title) => onChange({ ...slide, title })}
      />
      <TextArea
        label="Description"
        value={slide.description}
        onChange={(description) => onChange({ ...slide, description })}
      />
      <ImageField
        csrfToken={csrfToken}
        label="Image path"
        value={slide.image}
        onChange={(image) => onChange({ ...slide, image })}
      />
      <Field
        label="Image alt text"
        value={slide.alt}
        onChange={(alt) => onChange({ ...slide, alt })}
      />
    </div>
  );
}

function StatsEditor({
  title,
  items,
  onAdd,
  onChange,
}: {
  title: string;
  items: EditableStat[];
  onAdd: () => void;
  onChange: (items: EditableStat[]) => void;
}) {
  const targetPrefix = `stats-${title}`;

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-serif text-2xl font-semibold text-brand-ink">
          {title}
        </h3>
        <AddButton
          revealTargetId={getAddTargetId(targetPrefix, items.length)}
          onClick={onAdd}
        >
          Item
        </AddButton>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item, index) => (
          <article
            key={`${item.value}-${index}`}
            data-admin-add-target={getAddTargetId(targetPrefix, index)}
            className="rounded-md border border-brand-line bg-brand-cream p-4"
          >
            <div className="mb-4 flex justify-end">
              <RemoveButton onClick={() => onChange(removeArrayItem(items, index))} />
            </div>
            <div className="grid gap-4">
              <Field
                label="Value"
                value={item.value}
                onChange={(value) =>
                  onChange(updateArrayItem(items, index, { ...item, value }))
                }
              />
              <Field
                label="Label"
                value={item.label}
                onChange={(label) =>
                  onChange(updateArrayItem(items, index, { ...item, label }))
                }
              />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function TextCardEditor({
  title,
  items,
  onAdd,
  onChange,
}: {
  title: string;
  items: EditableTextCard[];
  onAdd: () => void;
  onChange: (items: EditableTextCard[]) => void;
}) {
  const targetPrefix = `text-cards-${title}`;

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-serif text-2xl font-semibold text-brand-ink">
          {title}
        </h3>
        <AddButton
          revealTargetId={getAddTargetId(targetPrefix, items.length)}
          onClick={onAdd}
        >
          Item
        </AddButton>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item, index) => (
          <article
            key={`${item.title}-${index}`}
            data-admin-add-target={getAddTargetId(targetPrefix, index)}
            className="rounded-md border border-brand-line bg-brand-cream p-4"
          >
            <div className="mb-4 flex justify-end">
              <RemoveButton onClick={() => onChange(removeArrayItem(items, index))} />
            </div>
            <div className="grid gap-4">
              <Field
                label="Title"
                value={item.title}
                onChange={(titleValue) =>
                  onChange(
                    updateArrayItem(items, index, { ...item, title: titleValue }),
                  )
                }
              />
              <TextArea
                label="Description"
                value={item.description}
                onChange={(description) =>
                  onChange(updateArrayItem(items, index, { ...item, description }))
                }
              />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function ProgramEditor({
  items,
  onAdd,
  onChange,
}: {
  items: EditableAcademicProgram[];
  onAdd: () => void;
  onChange: (items: EditableAcademicProgram[]) => void;
}) {
  const targetPrefix = "academic-programs";

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-serif text-2xl font-semibold text-brand-ink">
          Programs
        </h3>
        <AddButton
          revealTargetId={getAddTargetId(targetPrefix, items.length)}
          onClick={onAdd}
        >
          Program
        </AddButton>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {items.map((item, index) => (
          <article
            key={`${item.title}-${index}`}
            data-admin-add-target={getAddTargetId(targetPrefix, index)}
            className="rounded-md border border-brand-line bg-brand-cream p-4"
          >
            <div className="mb-4 flex justify-end">
              <RemoveButton onClick={() => onChange(removeArrayItem(items, index))} />
            </div>
            <div className="grid gap-4">
              <Field
                label="Title"
                value={item.title}
                onChange={(title) =>
                  onChange(updateArrayItem(items, index, { ...item, title }))
                }
              />
              <Field
                label="Eyebrow"
                value={item.eyebrow}
                onChange={(eyebrow) =>
                  onChange(updateArrayItem(items, index, { ...item, eyebrow }))
                }
              />
              <TextArea
                label="Description"
                value={item.description}
                onChange={(description) =>
                  onChange(updateArrayItem(items, index, { ...item, description }))
                }
              />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function ValuesEditor({
  items,
  onAdd,
  onChange,
}: {
  items: EditableValue[];
  onAdd: () => void;
  onChange: (items: EditableValue[]) => void;
}) {
  const targetPrefix = "about-values";

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-serif text-2xl font-semibold text-brand-ink">
          Mission, vision, values
        </h3>
        <AddButton
          revealTargetId={getAddTargetId(targetPrefix, items.length)}
          onClick={onAdd}
        >
          Value
        </AddButton>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item, index) => (
          <article
            key={`${item.letter}-${item.label}-${index}`}
            data-admin-add-target={getAddTargetId(targetPrefix, index)}
            className="rounded-md border border-brand-line bg-brand-cream p-4"
          >
            <div className="mb-4 flex justify-end">
              <RemoveButton onClick={() => onChange(removeArrayItem(items, index))} />
            </div>
            <div className="grid gap-4 sm:grid-cols-[120px_1fr]">
              <Field
                label="Letter"
                value={item.letter}
                onChange={(letter) =>
                  onChange(updateArrayItem(items, index, { ...item, letter }))
                }
              />
              <Field
                label="Label"
                value={item.label}
                onChange={(label) =>
                  onChange(updateArrayItem(items, index, { ...item, label }))
                }
              />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function AdmissionsStepsEditor({
  items,
  onAdd,
  onChange,
}: {
  items: EditableAdmissionsStep[];
  onAdd: () => void;
  onChange: (items: EditableAdmissionsStep[]) => void;
}) {
  const targetPrefix = "admissions-steps";

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-serif text-2xl font-semibold text-brand-ink">
          Admissions process steps
        </h3>
        <AddButton
          revealTargetId={getAddTargetId(targetPrefix, items.length)}
          onClick={onAdd}
        >
          Step
        </AddButton>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item, index) => (
          <article
            key={`${item.step}-${item.title}-${index}`}
            data-admin-add-target={getAddTargetId(targetPrefix, index)}
            className="rounded-md border border-brand-line bg-brand-cream p-4"
          >
            <div className="mb-4 flex justify-end">
              <RemoveButton onClick={() => onChange(removeArrayItem(items, index))} />
            </div>
            <div className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-[120px_1fr]">
                <Field
                  label="Step"
                  value={item.step}
                  onChange={(step) =>
                    onChange(updateArrayItem(items, index, { ...item, step }))
                  }
                />
                <Field
                  label="Title"
                  value={item.title}
                  onChange={(title) =>
                    onChange(updateArrayItem(items, index, { ...item, title }))
                  }
                />
              </div>
              <TextArea
                label="Description"
                value={item.description}
                onChange={(description) =>
                  onChange(updateArrayItem(items, index, { ...item, description }))
                }
              />
              <Field
                label="Note"
                value={item.note}
                onChange={(note) =>
                  onChange(updateArrayItem(items, index, { ...item, note }))
                }
              />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function DownloadItemsEditor({
  items,
  onAdd,
  onChange,
}: {
  items: EditableDownloadItem[];
  onAdd: () => void;
  onChange: (items: EditableDownloadItem[]) => void;
}) {
  const targetPrefix = "download-items";

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-serif text-2xl font-semibold text-brand-ink">
          Download documents
        </h3>
        <AddButton
          revealTargetId={getAddTargetId(targetPrefix, items.length)}
          onClick={onAdd}
        >
          Document
        </AddButton>
      </div>
      <div className="grid gap-4">
        {items.map((item, index) => (
          <article
            key={`${item.title}-${index}`}
            data-admin-add-target={getAddTargetId(targetPrefix, index)}
            className="rounded-md border border-brand-line bg-brand-cream p-4"
          >
            <div className="mb-4 flex justify-end">
              <RemoveButton onClick={() => onChange(removeArrayItem(items, index))} />
            </div>
            <div className="grid gap-5">
              <div className="grid gap-5 lg:grid-cols-2">
                <Field
                  label="Title"
                  value={item.title}
                  onChange={(title) =>
                    onChange(updateArrayItem(items, index, { ...item, title }))
                  }
                />
                <Field
                  label="Type"
                  value={item.type}
                  onChange={(type) =>
                    onChange(updateArrayItem(items, index, { ...item, type }))
                  }
                />
              </div>
              <TextArea
                label="Description"
                value={item.description}
                onChange={(description) =>
                  onChange(updateArrayItem(items, index, { ...item, description }))
                }
              />
              <Field
                label="Document URL or public path"
                value={item.href}
                onChange={(href) =>
                  onChange(updateArrayItem(items, index, { ...item, href }))
                }
              />
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="flex min-h-11 items-center gap-3 rounded-md border border-brand-line bg-white px-4 py-2 text-sm font-semibold text-brand-ink">
                  <input
                    type="checkbox"
                    checked={Boolean(item.isLocal)}
                    onChange={(event) =>
                      onChange(
                        updateArrayItem(items, index, {
                          ...item,
                          isLocal: event.target.checked,
                        }),
                      )
                    }
                    className="h-4 w-4 accent-brand-burgundy"
                  />
                  Local file in public folder
                </label>
                <label className="flex min-h-11 items-center gap-3 rounded-md border border-brand-line bg-white px-4 py-2 text-sm font-semibold text-brand-ink">
                  <input
                    type="checkbox"
                    checked={Boolean(item.needsClientApproval)}
                    onChange={(event) =>
                      onChange(
                        updateArrayItem(items, index, {
                          ...item,
                          needsClientApproval: event.target.checked,
                        }),
                      )
                    }
                    className="h-4 w-4 accent-brand-burgundy"
                  />
                  Needs approval note
                </label>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function PillarEditor({
  csrfToken,
  pillar,
  onChange,
}: {
  csrfToken: string;
  pillar: EditablePillar;
  onChange: (pillar: EditablePillar) => void;
}) {
  return (
    <div className="grid gap-5">
      <Field
        label="Title"
        value={pillar.title}
        onChange={(title) => onChange({ ...pillar, title })}
      />
      <TextArea
        label="Description"
        value={pillar.description}
        onChange={(description) => onChange({ ...pillar, description })}
      />
      <ImageField
        csrfToken={csrfToken}
        label="Image path"
        value={pillar.image}
        onChange={(image) => onChange({ ...pillar, image })}
      />
      <Field
        label="Image alt text"
        value={pillar.imageAlt}
        onChange={(imageAlt) => onChange({ ...pillar, imageAlt })}
      />
    </div>
  );
}

function GalleryImageEditor({
  csrfToken,
  image,
  onChange,
}: {
  csrfToken: string;
  image: EditableGalleryImage;
  onChange: (image: EditableGalleryImage) => void;
}) {
  return (
    <div className="grid gap-5">
      <div className="grid gap-5 lg:grid-cols-2">
        <Field
          label="Category"
          value={image.category}
          onChange={(category) => onChange({ ...image, category })}
        />
        <Field
          label="Alt text"
          value={image.alt}
          onChange={(alt) => onChange({ ...image, alt })}
        />
      </div>
      <ImageField
        csrfToken={csrfToken}
        label="Image path"
        value={image.src}
        onChange={(src) => onChange({ ...image, src })}
      />
    </div>
  );
}

function NewsEditor({
  csrfToken,
  item,
  onChange,
}: {
  csrfToken: string;
  item: EditableNewsItem;
  onChange: (item: EditableNewsItem) => void;
}) {
  return (
    <div className="grid gap-5">
      <div className="grid gap-5 lg:grid-cols-3">
        <Field
          label="Title"
          value={item.title}
          onChange={(title) => onChange({ ...item, title })}
        />
        <Field
          label="Date"
          value={item.date}
          onChange={(date) => onChange({ ...item, date })}
        />
        <Field
          label="Category"
          value={item.category}
          onChange={(category) => onChange({ ...item, category })}
        />
      </div>
      <TextArea
        label="Excerpt"
        value={item.excerpt}
        onChange={(excerpt) => onChange({ ...item, excerpt })}
      />
      <ImageField
        csrfToken={csrfToken}
        label="Image path"
        value={item.image}
        onChange={(image) => onChange({ ...item, image })}
      />
    </div>
  );
}

function LeadershipPersonEditor({
  csrfToken,
  person,
  onChange,
  noteLabel = "Profile note",
}: {
  csrfToken: string;
  person: EditableLeadershipPerson;
  onChange: (person: EditableLeadershipPerson) => void;
  noteLabel?: string;
}) {
  return (
    <div className="grid gap-5">
      <div className="grid gap-5 lg:grid-cols-2">
        <Field
          label="Name"
          value={person.name}
          onChange={(name) => onChange({ ...person, name })}
        />
        <Field
          label="Role"
          value={person.role}
          onChange={(role) => onChange({ ...person, role })}
        />
      </div>
      <TextArea
        label={noteLabel}
        value={person.description}
        onChange={(description) => onChange({ ...person, description })}
      />
      <ImageField
        csrfToken={csrfToken}
        label="Photo path"
        value={person.image}
        onChange={(image) => onChange({ ...person, image })}
      />
    </div>
  );
}

function LeadershipPeopleEditor({
  csrfToken,
  title,
  items,
  newItem,
  addLabel,
  onChange,
}: {
  csrfToken: string;
  title: string;
  items: EditableLeadershipPerson[];
  newItem: EditableLeadershipPerson;
  addLabel: string;
  onChange: (items: EditableLeadershipPerson[]) => void;
}) {
  const targetPrefix = `leadership-${title}`;

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-serif text-2xl font-semibold text-brand-ink">
          {title}
        </h3>
        <AddButton
          revealTargetId={getAddTargetId(targetPrefix, items.length)}
          onClick={() => onChange([...items, newItem])}
        >
          {addLabel}
        </AddButton>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item, index) => (
          <article
            key={`${item.role}-${index}`}
            data-admin-add-target={getAddTargetId(targetPrefix, index)}
            className="rounded-md border border-brand-line bg-brand-cream p-4"
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <h4 className="font-serif text-xl font-semibold text-brand-ink">
                {item.name || `${title} ${index + 1}`}
              </h4>
              <RemoveButton onClick={() => onChange(removeArrayItem(items, index))} />
            </div>
            <LeadershipPersonEditor
              csrfToken={csrfToken}
              person={item}
              onChange={(person) => onChange(updateArrayItem(items, index, person))}
            />
          </article>
        ))}
      </div>
    </div>
  );
}

function StringListEditor({
  title,
  items,
  onAdd,
  onChange,
}: {
  title: string;
  items: string[];
  onAdd: () => void;
  onChange: (items: string[]) => void;
}) {
  const targetPrefix = `string-list-${title}`;

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-serif text-2xl font-semibold text-brand-ink">
          {title}
        </h3>
        <AddButton
          revealTargetId={getAddTargetId(targetPrefix, items.length)}
          onClick={onAdd}
        >
          Item
        </AddButton>
      </div>
      <div className="grid gap-3">
        {items.map((item, index) => (
          <div
            key={`${item}-${index}`}
            data-admin-add-target={getAddTargetId(targetPrefix, index)}
            className="grid gap-3 rounded-md border border-brand-line bg-brand-cream p-4 sm:grid-cols-[1fr_auto] sm:items-end"
          >
            <Field
              label={`Item ${index + 1}`}
              value={item}
              onChange={(value) => onChange(updateArrayItem(items, index, value))}
            />
            <RemoveButton onClick={() => onChange(removeArrayItem(items, index))} />
          </div>
        ))}
      </div>
    </div>
  );
}
