import type { MetadataRoute } from "next";
import { blogSeries, getPosts, getProjects, getResearch } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "about", "research", "publications", "projects", "lab", "news", "blog", "achievements", "contact"];
  return [
    ...pages.map((p) => ({ url: `${SITE_URL}/${p ? `${p}/` : ""}` })),
    ...getResearch().map((r) => ({ url: `${SITE_URL}/research/${r.slug}/` })),
    ...getProjects().map((p) => ({ url: `${SITE_URL}/projects/${p.slug}/` })),
    ...getPosts().filter((p) => !p.draft && !p.external).map((p) => ({ url: `${SITE_URL}/blog/${p.slug}/`, lastModified: p.date })),
    ...blogSeries.map((s) => ({ url: `${SITE_URL}/blog/series/${s.key}/` })),
  ];
}
