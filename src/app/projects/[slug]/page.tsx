import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjects, getPublications, projectCategories, projectContext } from "@/lib/content";
import { renderMarkdown } from "@/lib/markdown";
import { Container, Pill } from "@/components/ui";
import PublicationItem from "@/components/PublicationItem";
import { ArrowRight, ArrowUpRight, GitHubIcon } from "@/components/Icons";

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProjects().find((x) => x.slug === slug);
  if (!p) return {};
  return { title: p.title, description: p.summary, openGraph: p.image ? { images: [p.image] } : undefined };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const all = getProjects();
  const i = all.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const p = all[i];
  const { html } = await renderMarkdown(p.body);
  const paper = p.paper ? getPublications().find((x) => x.key === p.paper) : undefined;
  const category = projectCategories.find((c) => c.key === p.category);
  const gallery = (p.gallery ?? []).filter((g) => g !== p.image);
  const prev = all[i - 1];
  const next = all[i + 1];

  return (
    <article>
      {/* Header */}
      <header className="border-b border-line bg-linear-to-b from-accent-soft to-bg">
        <Container className="py-10 sm:py-12">
          <nav aria-label="Breadcrumb" className="text-sm text-muted">
            <Link href="/projects/" className="hover:text-accent">Projects</Link>
            <span className="mx-2">/</span>
            <Link href={`/projects/#${p.category}`} className="hover:text-accent">{category?.title}</Link>
          </nav>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-fg sm:text-4xl">{p.title}</h1>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-fg-2">{p.summary}</p>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <Pill tone="plain">{projectContext(p)}</Pill>
            {(p.tags ?? []).filter((t) => t !== "Open source").map((t) => <Pill key={t}>{t}</Pill>)}
          </div>
          {(p.repo || p.link || paper) && (
            <div className="mt-6 flex flex-wrap gap-3">
              {p.repo && (
                <a href={p.repo} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-sm font-semibold text-bg transition hover:opacity-90">
                  <GitHubIcon width={16} height={16} /> View code
                </a>
              )}
              {p.link && (
                <a href={p.link} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-fg transition hover:brightness-110">
                  Project link <ArrowUpRight width={16} height={16} />
                </a>
              )}
              {paper && (
                <a href="#paper" className="inline-flex items-center gap-2 rounded-full bg-surface px-5 py-2.5 text-sm font-semibold text-fg ring-1 ring-line transition hover:text-accent hover:ring-accent">
                  Read the paper
                </a>
              )}
            </div>
          )}
        </Container>
      </header>

      <Container className="py-12">
        <div className="mx-auto max-w-3xl">
          {p.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.image} alt={p.title} className="max-h-[620px] w-full rounded-2xl bg-surface-2 object-contain shadow-sm ring-1 ring-line" />
          )}

          {html.trim() ? (
            <div
              className="reading prose dark:prose-invert mt-10 max-w-none prose-headings:font-semibold prose-headings:text-fg prose-a:text-accent prose-p:leading-relaxed"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          ) : null}

          {p.videos?.length ? (
            <section className="mt-12">
              <h2 className="text-xl font-semibold text-fg">Video</h2>
              <div className="mt-4 space-y-6">
                {p.videos.map((v) => (
                  <div key={v} className="aspect-video overflow-hidden rounded-2xl bg-black shadow-sm">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${v}`}
                      title={`${p.title}: video`}
                      loading="lazy"
                      allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="size-full"
                    />
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {gallery.length > 0 && (
            <section className="mt-12">
              <h2 className="text-xl font-semibold text-fg">Gallery</h2>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {gallery.map((src) => (
                  <a key={src} href={src} target="_blank" rel="noopener" className="group block overflow-hidden rounded-xl bg-surface-2 ring-1 ring-line">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover transition duration-300 group-hover:scale-[1.04]" />
                  </a>
                ))}
              </div>
            </section>
          )}

          {paper && (
            <section id="paper" className="mt-12 scroll-mt-24">
              <h2 className="text-xl font-semibold text-fg">Related publication</h2>
              <ol className="mt-2 rounded-2xl bg-surface px-5 shadow-sm ring-1 ring-line sm:px-6">
                <PublicationItem pub={paper} />
              </ol>
            </section>
          )}

          {p.source && (
            <p className="mt-10 text-sm text-muted">
              Originally documented on the <a href={p.source} target="_blank" rel="noopener" className="text-accent hover:underline">Ahsan’s Lab website</a>.
            </p>
          )}

          {/* Prev / next */}
          <nav aria-label="More projects" className="mt-12 grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
            {prev ? (
              <Link href={`/projects/${prev.slug}/`} className="group rounded-2xl p-4 ring-1 ring-line transition hover:ring-accent/40">
                <span className="text-xs font-semibold uppercase tracking-wide text-muted">← Previous</span>
                <span className="mt-1 block font-semibold text-fg group-hover:text-accent">{prev.title}</span>
              </Link>
            ) : <span />}
            {next ? (
              <Link href={`/projects/${next.slug}/`} className="group rounded-2xl p-4 text-right ring-1 ring-line transition hover:ring-accent/40">
                <span className="text-xs font-semibold uppercase tracking-wide text-muted">Next →</span>
                <span className="mt-1 block font-semibold text-fg group-hover:text-accent">{next.title}</span>
              </Link>
            ) : <span />}
          </nav>
          <div className="mt-8 text-center">
            <Link href="/projects/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
              All projects <ArrowRight width={15} height={15} />
            </Link>
          </div>
        </div>
      </Container>
    </article>
  );
}
