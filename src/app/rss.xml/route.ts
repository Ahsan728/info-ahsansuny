import { getNews, getPosts } from "@/lib/content";
import { profile, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function GET() {
  const items = [
    ...getNews().map((n) => ({ title: n.title, date: n.date, link: n.link ?? `${SITE_URL}/news/`, cat: "news" })),
    ...getPosts()
      .filter((p) => !p.draft)
      .map((p) => ({ title: p.title, date: p.date, link: p.external ?? `${SITE_URL}/blog/${p.slug}/`, cat: "blog" })),
  ].sort((a, b) => +b.date - +a.date);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
<title>${esc(profile.short)}: News &amp; Blogs</title>
<link>${SITE_URL}</link>
<description>${esc(profile.tagline)}</description>
${items
  .map(
    (i) => `<item><title>${esc(i.title)}</title><link>${esc(i.link)}</link><guid isPermaLink="false">${esc(i.link)}#${+i.date}</guid><pubDate>${i.date.toUTCString()}</pubDate><category>${i.cat}</category></item>`,
  )
  .join("\n")}
</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
