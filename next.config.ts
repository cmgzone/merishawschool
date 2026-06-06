import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  ...(process.env.NODE_ENV === "production"
    ? [
        {
          key: "Strict-Transport-Security",
          value: "max-age=31536000; includeSubDomains",
        },
      ]
    : []),
];

const adminNoStoreHeaders = [
  {
    key: "Cache-Control",
    value: "no-store, max-age=0",
  },
];

const legacyRedirects = [
  { source: "/about-us", destination: "/about" },
  { source: "/a-word-from-our-director", destination: "/founders-vision" },
  { source: "/principals-welcome-note", destination: "/leadership" },
  { source: "/principal-welcome-note", destination: "/leadership" },
  { source: "/mission-vision-and-values", destination: "/about" },
  { source: "/governance", destination: "/leadership" },
  { source: "/curriculum", destination: "/academics" },
  { source: "/our-curriculum", destination: "/academics" },
  { source: "/our-pillars", destination: "/academics" },
  { source: "/facilities", destination: "/infrastructure" },
  { source: "/application-process", destination: "/admissions" },
  { source: "/application-form", destination: "/admissions" },
  { source: "/fee-structure", destination: "/downloads" },
  { source: "/fees", destination: "/downloads" },
  { source: "/school-fees", destination: "/downloads" },
  { source: "/2024-school-fee-structure", destination: "/downloads" },
  { source: "/2023-school-fee-structure", destination: "/downloads" },
  { source: "/contactus", destination: "/contact" },
  { source: "/contact-us", destination: "/contact" },
  { source: "/school-news", destination: "/news" },
  { source: "/blog", destination: "/news" },
  { source: "/blog/:path*", destination: "/news" },
  { source: "/extra-curricular-activities", destination: "/clubs" },
  { source: "/pictures", destination: "/gallery" },
  { source: "/videos", destination: "/gallery" },
  { source: "/jobs", destination: "/career-opportunities" },
  { source: "/website/info", destination: "/" },
  {
    source: "/web/content/18896",
    destination: "/docs/merishaw-current-fee-structure.pdf",
  },
  {
    source: "/web/content/421",
    destination: "/docs/merishaw-current-fee-structure.pdf",
  },
  { source: "/web/content/:path*", destination: "/downloads" },
  { source: "/founders-mission", destination: "/founders-vision" },
].map((redirect) => ({
  ...redirect,
  permanent: true,
}));

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return legacyRedirects;
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        source: "/admin",
        headers: adminNoStoreHeaders,
      },
      {
        source: "/admin/:path*",
        headers: adminNoStoreHeaders,
      },
      {
        source: "/api/admin/:path*",
        headers: adminNoStoreHeaders,
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
