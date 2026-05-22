"use client";

import { FormEvent, useState } from "react";
import { LockKeyhole, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";

type AdminLoginProps = {
  authRequired: boolean;
  localDevAuth: boolean;
  usesHashedPassword: boolean;
};

export default function AdminLogin({
  authRequired,
  localDevAuth,
  usesHashedPassword,
}: AdminLoginProps) {
  const router = useRouter();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, username }),
      });
      const payload = (await response.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!response.ok) {
        throw new Error(payload.error ?? "Admin login failed.");
      }

      router.refresh();
    } catch (loginError) {
      setError(
        loginError instanceof Error ? loginError.message : "Admin login failed.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-brand-cream px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-md border border-brand-line bg-white shadow-premium lg:grid-cols-[0.9fr_1.1fr]">
        <section className="bg-brand-ink p-8 text-white sm:p-10">
          <p className="text-sm font-bold uppercase tracking-wide text-brand-gold">
            Merishaw Admin
          </p>
          <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight sm:text-5xl">
            Sign in to manage the website.
          </h1>
          <p className="mt-5 text-sm font-medium leading-7 text-white/78">
            Content, photos, downloads, page headers, and school updates are
            protected behind a custom admin session.
          </p>
        </section>

        <form onSubmit={login} className="grid content-center gap-5 p-7 sm:p-10">
          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-brand-burgundy text-white">
            <LockKeyhole className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-serif text-3xl font-semibold text-brand-ink">
              Admin authentication
            </h2>
            <p className="mt-2 text-sm leading-7 text-brand-muted">
              {authRequired
                ? "Enter the admin username and password configured for this website."
                : "Local development mode is available because ADMIN_PASSWORD is not set."}
            </p>
          </div>

          {authRequired ? (
            <>
              <label className="block text-sm font-semibold text-brand-ink">
                Username
                <input
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  autoComplete="username"
                  className="mt-2 w-full rounded-md border border-brand-line bg-white px-4 py-3 text-sm font-medium outline-none transition focus:border-brand-burgundy focus:ring-2 focus:ring-brand-gold/40"
                  required
                />
              </label>
              <label className="block text-sm font-semibold text-brand-ink">
                Admin password
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                  className="mt-2 w-full rounded-md border border-brand-line bg-white px-4 py-3 text-sm font-medium outline-none transition focus:border-brand-burgundy focus:ring-2 focus:ring-brand-gold/40"
                  required
                />
              </label>
              <p className="rounded-md border border-brand-line bg-brand-cream p-3 text-xs font-semibold leading-6 text-brand-muted">
                {usesHashedPassword
                  ? "Password hashing is active."
                  : "Plain ADMIN_PASSWORD fallback is active. Use ADMIN_PASSWORD_HASH before production."}
              </p>
            </>
          ) : null}

          {!authRequired && !localDevAuth ? (
            <p className="rounded-md bg-red-50 p-4 text-sm font-semibold leading-6 text-red-700">
              Set ADMIN_PASSWORD before using the admin panel on a public host.
            </p>
          ) : null}

          {error ? (
            <p className="rounded-md bg-red-50 p-4 text-sm font-semibold leading-6 text-red-700">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={submitting || (!authRequired && !localDevAuth)}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-brand-burgundy px-5 py-3 text-sm font-bold text-white transition hover:bg-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <LogIn className="h-4 w-4" />
            {submitting
              ? "Signing in"
              : authRequired
                ? "Sign in"
                : "Continue locally"}
          </button>
        </form>
      </div>
    </div>
  );
}
