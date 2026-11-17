import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getResearch } from "@/lib/content";
import { renderMarkdown } from "@/lib/markdown";
import { Container, Pill } from "@/components/ui";
import { ArrowUpRight } from "@/components/Icons";

export const dynamicParams = false;

export function generateStaticParams() {
  return getResearch().map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const r = getResearch().find((x) => x.slug === slug);
  return r ? { title: r.title, description: r.summary } : {};
}

export default async function ResearchItemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = getResearch().find((x) => x.slug === slug);
  if (!r) notFound();
  const { html } = await renderMarkdown(r.body.replace(/<!--[\s\S]*?-->/g, ""));

  return (
    <article>
      <header className="border-b border-line bg-linear-to-b from-accent-soft to-bg">
        <Container className="py-10 sm:py-12">
          <nav aria-label="Breadcrumb" className="text-sm text-muted">
            <Link href="/research/" className="hover:text-accent">Research</Link>
          </nav>
          <p className="mt-3 text-sm font-semibold text-accent">{r.status === "current" ? "Current research" : "Research"} · {r.period}</p>
          <h1 className="mt-1 max-w-3xl text-3xl font-bold tracking-tight text-fg sm:text-4xl">{r.title}</h1>
          <p className="mt-2 text-fg-2">{r.institution}</p>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-fg-2">{r.summary}</p>
          <div className="mt-5 flex flex-wrap gap-2">{(r.tags ?? []).map((t) => <Pill key={t}>{t}</Pill>)}</div>
        </Container>
      </header>
      <Container className="py-12">
        <div className="mx-auto max-w-3xl">
          {r.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={r.image} alt={r.title} className="mb-10 max-h-[560px] w-full rounded-2xl bg-white object-contain shadow-sm ring-1 ring-line" />
          )}
          <div className="reading prose dark:prose-invert max-w-none prose-headings:font-semibold prose-a:text-accent" dangerouslySetInnerHTML={{ __html: html }} />
          {(r.gallery ?? []).filter((g) => g !== r.image).length > 0 && (
            <section className="mt-12">
              <h2 className="text-xl font-semibold">Figures</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {(r.gallery ?? []).filter((g) => g !== r.image).map((src) => (
                  <a key={src} href={src} target="_blank" rel="noopener" className="group block overflow-hidden rounded-xl border border-line bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="" loading="lazy" className="aspect-[4/3] w-full object-contain p-2 transition duration-300 group-hover:scale-[1.03]" />
                  </a>
                ))}
              </div>
            </section>
          )}
          {(r.links ?? []).length > 0 && (
            <div className="mt-10 flex flex-wrap gap-3">
              {r.links!.map((l) => (
                <a key={l.url} href={l.url} target="_blank" rel="noopener"
                  className="inline-flex items-center gap-1.5 rounded-full bg-surface px-4 py-2 text-sm font-semibold text-fg ring-1 ring-line hover:text-accent hover:ring-accent">
                  {l.label} <ArrowUpRight width={14} height={14} />
                </a>
              ))}
            </div>
          )}
        </div>
      </Container>
    </article>
  );
}
