import type { Metadata } from "next";
import Link from "next/link";
import { blogSeries, fmtLong, getPosts, readingTime, seriesPosts } from "@/lib/content";
import { Container, PageHeader, card, cardHover } from "@/components/ui";
import { ArrowRight, ArrowUpRight, ChipIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Blogs",
  description: "A memoir of university life, travel stories, short fiction and technical notes, in Bengali and English.",
};

export default function BlogPage() {
  const posts = getPosts();
  // Newest two from each series, so one long series does not fill the list.
  const recent = blogSeries.flatMap((s) => seriesPosts(s.key).slice().sort((a, b) => +b.date - +a.date).slice(0, 2));
  const seriesOf = (key?: string) => blogSeries.find((s) => s.key === key);

  return (
    <>
      <PageHeader eyebrow="Blogs" title="Stories, travels & notes">
        {posts.length} pieces: a 42-part memoir of my university years, travel stories, short fiction and robotics tutorials, mostly in Bengali, plus technical notes in English.
      </PageHeader>

      <Container className="py-14">
        {[
          { group: "technical", title: "Engineering & robotics", grid: "sm:grid-cols-2" },
          { group: "stories", title: "Memoir, travel & stories", grid: "sm:grid-cols-2 lg:grid-cols-3" },
        ].map((g, gi) => (
        <section key={g.group} className={gi ? "mt-14" : ""}>
        <h2 className="text-2xl font-bold">{g.title}</h2>
        <div className={`mt-6 grid gap-5 ${g.grid}`}>
          {blogSeries.filter((s) => s.group === g.group).map((s) => {
            const items = seriesPosts(s.key);
            if (!items.length) return null;
            const cover = items.find((p) => p.cover)?.cover;
            // The long memoir gets the large card.
            const featured = s.key === "snataker-dingulir-sholo-ana";
            return (
              <Link key={s.key} href={`/blog/series/${s.key}/`}
                className={`group flex flex-col overflow-hidden ${card} ${cardHover} ${featured ? "sm:col-span-2 lg:row-span-2" : ""}`}>
                <div className={`relative overflow-hidden bg-surface-2 ${featured ? "aspect-[16/9] lg:aspect-auto lg:flex-1" : "aspect-[16/9]"}`}>
                  {cover ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={cover} alt="" loading="lazy" className="absolute inset-0 size-full object-cover transition duration-500 group-hover:scale-[1.04]" />
                  ) : (
                    <div className="bg-grid absolute inset-0 grid place-items-center bg-linear-to-br from-cyan-900/60 to-violet-900/60">
                      <ChipIcon width={64} height={64} className="-mt-10 text-cyan-300/80" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/25 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <span className="rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur">
                      {s.en} · {items.length} {items.length === 1 ? "post" : "posts"}
                    </span>
                    <h3 lang={s.lang} className={`mt-2 font-bold leading-snug !text-white ${featured ? "text-2xl sm:text-3xl" : "text-xl"}`}>{s.title}</h3>
                  </div>
                </div>
                <div className="flex flex-col p-5">
                  <p className="text-sm leading-relaxed text-muted">{s.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                    {featured ? "Start reading from part 1" : "Open series"}
                    <ArrowRight width={14} height={14} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
        </section>
        ))}

        {/* ---------- Most recent ---------- */}
        <h2 className="mt-16 text-2xl font-bold">Latest from each series</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {recent.map((p) => {
            const s = seriesOf(p.series);
            const href = p.external ?? `/blog/${p.slug}/`;
            return (
              <article key={p.slug} className={`group relative flex gap-4 p-4 ${card} ${cardHover}`}>
                {p.cover && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.cover} alt="" loading="lazy" className="hidden size-24 shrink-0 rounded-xl object-cover sm:block" />
                )}
                <div className="min-w-0">
                  <p className="text-xs font-medium text-accent">
                    {s?.en ?? "Blog"}{p.part ? ` · Part ${p.part}` : ""}
                  </p>
                  <h3 lang={p.lang} className="mt-1 line-clamp-2 font-semibold leading-snug transition group-hover:text-accent">
                    {p.title} {p.external && <ArrowUpRight width={13} height={13} className="inline" />}
                  </h3>
                  <p className="mt-1.5 text-xs text-muted">
                    {fmtLong(p.date)} · {p.external ? "Biggan Jatra" : `${readingTime(p.body)} min read`}
                  </p>
                </div>
                <Link href={href} {...(p.external ? { target: "_blank", rel: "noopener" } : {})} className="absolute inset-0 rounded-2xl" aria-label={p.title} />
              </article>
            );
          })}
        </div>
      </Container>
    </>
  );
}
