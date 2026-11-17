import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogSeries, fmtLong, getPosts, readingTime, seriesPosts } from "@/lib/content";
import { renderMarkdown } from "@/lib/markdown";
import { profile, SITE_URL } from "@/lib/site";
import { Container } from "@/components/ui";

export const dynamicParams = false;

export function generateStaticParams() {
  const posts = getPosts().filter((p) => !p.external);
  // A static export needs at least one path; "_" renders a 404 if there are no posts yet.
  return posts.length ? posts.map((p) => ({ slug: p.slug })) : [{ slug: "_" }];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getPosts().find((x) => x.slug === slug);
  return p
    ? { title: p.title, description: p.description, openGraph: { type: "article", images: p.cover ? [p.cover] : undefined } }
    : {};
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const all = getPosts().filter((p) => !p.external);
  const post = all.find((x) => x.slug === slug);
  if (!post) notFound();

  // Prev/next: within the series (reading order) if the post belongs to one, else by date.
  const series = blogSeries.find((s) => s.key === post.series);
  const siblings = series ? seriesPosts(series.key).filter((p) => !p.external) : all.slice().reverse();
  const idx = siblings.findIndex((p) => p.slug === post.slug);
  const prev = siblings[idx - 1];
  const next = siblings[idx + 1];
  const total = series ? seriesPosts(series.key).length : 0;

  // Imported Bengali posts use single line breaks for dialogue and verse.
  const { html, headings } = await renderMarkdown(post.body, { breaks: post.lang === "bn" || !!post.source });

  const url = `${SITE_URL}/blog/${post.slug}/`;
  const year = post.date.getUTCFullYear();
  const last = profile.name.split(" ").pop()!;
  const first = profile.name.split(" ").slice(0, -1).join(" ");
  const citeText = `${last}, ${first}. (${post.date.toLocaleDateString("en-GB", { month: "short", year: "numeric", timeZone: "UTC" })}). ${post.title}. ${profile.short}’s blog. ${url}`;
  const citeBib = `@misc{${last.toLowerCase()}${year}${post.slug.replace(/[^a-z0-9]/g, "").slice(0, 16)},
  title        = "${post.title}",
  author       = "${profile.name}",
  howpublished = "${profile.short}'s blog",
  year         = "${year}",
  url          = "${url}"
}`;

  return (
    <Container className="py-12">
      <article lang={post.lang} className="mx-auto max-w-3xl">
        <nav lang="en" aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-muted">
          <Link href="/blog/" className="hover:text-accent">Blogs</Link>
          {series && (
            <>
              <span>/</span>
              <Link href={`/blog/series/${series.key}/`} lang={series.lang} className="hover:text-accent">{series.title}</Link>
            </>
          )}
        </nav>

        {series && post.part && (
          <p lang="en" className="mt-5 inline-flex rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
            {series.en} · Part {post.part} of {total}
          </p>
        )}
        <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">{post.title}</h1>
        <p lang="en" className="mt-3 text-sm text-muted">
          Date: {fmtLong(post.date)} &nbsp;|&nbsp; Estimated reading time: {readingTime(post.body)} min &nbsp;|&nbsp; Author: {profile.short}
        </p>

        {headings.length > 1 && (
          <details open className="mt-8 rounded-xl border border-line bg-surface-2 px-5 py-4">
            <summary lang="en" className="cursor-pointer font-semibold text-fg">Table of contents</summary>
            <ul className="mt-3 space-y-1.5 text-[15px]">
              {headings.map((h) => (
                <li key={h.id} className={h.depth === 3 ? "pl-5" : ""}>
                  <a href={`#${h.id}`} className="text-fg-2 hover:text-accent">{h.text}</a>
                </li>
              ))}
            </ul>
          </details>
        )}

        <div
          className="reading prose prose-lg mt-8 max-w-none dark:prose-invert prose-headings:scroll-mt-24 prose-headings:font-semibold prose-a:text-accent prose-img:mx-auto prose-img:max-h-[620px] prose-img:w-auto prose-img:rounded-xl prose-pre:border prose-pre:border-line prose-pre:bg-surface-2 prose-pre:text-fg-2"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {post.source && (
          <p lang="en" className="mt-10 text-sm text-muted">
            Originally published on <a href={post.source} target="_blank" rel="noopener" className="text-accent hover:underline">my Blogger blog</a>.
          </p>
        )}

        <section lang="en" className="mt-12 border-t border-line pt-8 text-sm">
          <p className="text-fg-2">Cited as:</p>
          <blockquote className="mt-2 rounded-r-lg border-l-4 border-accent bg-surface-2 px-4 py-3 text-fg-2">{citeText}</blockquote>
          <p className="mt-4 text-fg-2">Or</p>
          <pre className="mt-2 overflow-x-auto rounded-lg border border-line bg-surface-2 p-4 font-mono text-xs leading-relaxed text-fg-2">{citeBib}</pre>
        </section>

        <nav aria-label={series ? "More in this series" : "More posts"} className="mt-10 grid gap-4 sm:grid-cols-2">
          {prev ? (
            <Link href={`/blog/${prev.slug}/`} className="rounded-xl border border-line bg-surface p-4 transition hover:border-accent">
              <span lang="en" className="block text-xs text-muted">← {series ? "Previous part" : "Older"}</span>
              <span lang={prev.lang} className="font-semibold">{prev.title}</span>
            </Link>
          ) : <span />}
          {next ? (
            <Link href={`/blog/${next.slug}/`} className="rounded-xl border border-line bg-surface p-4 text-right transition hover:border-accent">
              <span lang="en" className="block text-xs text-muted">{series ? "Next part" : "Newer"} →</span>
              <span lang={next.lang} className="font-semibold">{next.title}</span>
            </Link>
          ) : <span />}
        </nav>
        {series && (
          <p lang="en" className="mt-6 text-center">
            <Link href={`/blog/series/${series.key}/`} className="text-sm font-semibold text-accent hover:underline">
              All {total} parts of {series.en} →
            </Link>
          </p>
        )}
      </article>
    </Container>
  );
}
