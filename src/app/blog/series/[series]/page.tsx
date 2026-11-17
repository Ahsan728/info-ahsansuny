import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogSeries, fmtLong, readingTime, seriesPosts } from "@/lib/content";
import { Container, card, cardHover } from "@/components/ui";
import { ArrowUpRight } from "@/components/Icons";

export const dynamicParams = false;

export function generateStaticParams() {
  return blogSeries.filter((s) => seriesPosts(s.key).length).map((s) => ({ series: s.key }));
}

export async function generateMetadata({ params }: { params: Promise<{ series: string }> }): Promise<Metadata> {
  const { series } = await params;
  const s = blogSeries.find((x) => x.key === series);
  return s ? { title: `${s.title} (${s.en})`, description: s.description } : {};
}

export default async function SeriesPage({ params }: { params: Promise<{ series: string }> }) {
  const { series } = await params;
  const s = blogSeries.find((x) => x.key === series);
  if (!s) notFound();
  const posts = seriesPosts(s.key);
  const cover = posts.find((p) => p.cover)?.cover;
  // Thumbnails only help when posts have different pictures.
  const varied = new Set(posts.map((p) => p.cover)).size > 1;
  const minutes = posts.reduce((n, p) => n + (p.external ? 0 : readingTime(p.body)), 0);

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        {cover && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={cover} alt="" className="absolute inset-0 size-full object-cover opacity-30 blur-sm" />
        )}
        <div className="absolute inset-0 bg-linear-to-b from-bg/60 via-bg/85 to-bg" />
        <Container className="relative py-16 sm:py-20">
          <Link href="/blog/" className="text-sm text-muted hover:text-accent">← Blogs</Link>
          <p className="mt-6 text-sm font-semibold text-accent">{s.en} · {posts.length} {posts.length === 1 ? "post" : "posts"}{minutes ? ` · about ${minutes} min of reading` : ""}</p>
          <h1 lang={s.lang} className="mt-2 text-4xl font-bold sm:text-5xl">{s.title}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-fg-2">{s.description}</p>
        </Container>
      </section>

      <Container className="py-12">
        <ol className="mx-auto max-w-3xl space-y-3">
          {posts.map((p, i) => {
            const href = p.external ?? `/blog/${p.slug}/`;
            return (
              <li key={p.slug}>
                <Link href={href} {...(p.external ? { target: "_blank", rel: "noopener" } : {})}
                  className={`group flex items-center gap-4 p-3 pr-5 ${card} ${cardHover}`}>
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent-soft font-mono text-sm font-bold text-accent">
                    {String(p.part ?? i + 1).padStart(2, "0")}
                  </span>
                  {varied && p.cover && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.cover} alt="" loading="lazy" className="hidden h-14 w-20 shrink-0 rounded-lg object-cover sm:block" />
                  )}
                  <span className="min-w-0 flex-1">
                    <span lang={p.lang} className="block truncate font-semibold transition group-hover:text-accent">{p.title}</span>
                    <span className="block text-xs text-muted">
                      {fmtLong(p.date)} · {p.external ? "on Biggan Jatra" : `${readingTime(p.body)} min read`}
                    </span>
                  </span>
                  {p.external && <ArrowUpRight width={16} height={16} className="shrink-0 text-muted" />}
                </Link>
              </li>
            );
          })}
        </ol>
      </Container>
    </>
  );
}
