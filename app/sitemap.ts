import type { MetadataRoute } from "next";
import { academicExperiencePages } from "@/data/academics";
import { contentNeededPages } from "@/data/content-needed";
import { siteConfig } from "@/data/site";

const staticRoutes = [
  "/",
  "/about",
  "/academics",
  "/academics/844",
  "/admissions",
  "/aviation",
  "/clubs",
  "/contact",
  "/csr",
  "/downloads",
  "/founders-vision",
  "/gallery",
  "/infrastructure",
  "/leadership",
  "/news",
  "/sports",
  "/support-a-child",
];

function absoluteUrl(path: string) {
  return new URL(path, siteConfig.url).toString();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const dynamicRoutes = [
    ...Object.keys(academicExperiencePages),
    ...Object.keys(contentNeededPages),
  ].map((slug) => `/${slug}`);

  const routes = [...new Set([...staticRoutes, ...dynamicRoutes])];
  const lastModified = new Date();

  return routes.map((route) => ({
    url: absoluteUrl(route),
    lastModified,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
