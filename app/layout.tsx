import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import FloatingSocialRail from "@/components/FloatingSocialRail";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import TawkChat from "@/components/TawkChat";
import { getEditableContent } from "@/data/admin-content";
import { seoDefaults, siteConfig } from "@/data/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-lora",
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    template: seoDefaults.titleTemplate,
    default: seoDefaults.defaultTitle,
  },
  description: seoDefaults.description,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
  },
  openGraph: {
    title: seoDefaults.defaultTitle,
    description: seoDefaults.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.logo, width: 512, height: 512 }],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: seoDefaults.defaultTitle,
    description: seoDefaults.description,
    images: [siteConfig.logo],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = await getEditableContent();

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${cormorant.variable}`}
    >
      <body className="font-sans antialiased">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Navbar site={content.site} />
        <FloatingSocialRail socials={content.site.socials} />
        <main id="main-content">{children}</main>
        <Footer site={content.site} />
        <TawkChat
          embedUrl={content.site.tawkEmbedUrl}
          propertyId={content.site.tawkPropertyId}
          widgetId={content.site.tawkWidgetId}
        />
      </body>
    </html>
  );
}
