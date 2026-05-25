import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import AdminContentEditor from "@/app/admin/AdminContentEditor";
import AdminLogin from "@/app/admin/AdminLogin";
import { getEditableContent } from "@/data/admin-content";
import {
  adminSessionCookieName,
  canUseLocalDevAuth,
  getAdminSessionFromToken,
  isAdminEmailConfigured,
  isAdminPasswordConfigured,
  isAdminSessionSecretConfigured,
  isUsingHashedAdminPassword,
} from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin",
  description: "Edit Merishaw School website content and images.",
  robots: {
    follow: false,
    index: false,
  },
};

export default async function AdminPage() {
  const headerStore = await headers();
  const host = headerStore.get("host") ?? "";
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(adminSessionCookieName)?.value;
  const session = getAdminSessionFromToken(sessionToken, host);
  const authRequired = isAdminPasswordConfigured();
  const localDevAuth = canUseLocalDevAuth(host);

  if (!session) {
    return (
      <AdminLogin
        authRequired={authRequired}
        emailRequired={process.env.NODE_ENV === "production"}
        emailReady={isAdminEmailConfigured()}
        localDevAuth={localDevAuth}
        sessionSecretRequired={process.env.NODE_ENV === "production"}
        sessionSecretReady={isAdminSessionSecretConfigured()}
        usesHashedPassword={isUsingHashedAdminPassword()}
      />
    );
  }

  const content = await getEditableContent();

  return <AdminContentEditor csrfToken={session.csrf} initialContent={content} />;
}
