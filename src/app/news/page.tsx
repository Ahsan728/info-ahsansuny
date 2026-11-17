import type { Metadata } from "next";
import { getNews } from "@/lib/content";
import { Container, PageHeader } from "@/components/ui";
import NewsList from "@/components/NewsList";

export const metadata: Metadata = {
  title: "News",
  description: "News and updates: career, publications, the lab and awards.",
};

export default function NewsPage() {
  const all = getNews();
  const years = [...new Set(all.map((n) => n.date.getUTCFullYear()))];
  return (
    <>
      <PageHeader eyebrow="News" title="News & updates">
        Milestones from my career, publications and Ahsan’s Lab. <a href="/rss.xml" className="font-semibold text-accent hover:underline">Subscribe via RSS</a>.
      </PageHeader>
      <Container className="py-12">
        <div className="mx-auto max-w-3xl space-y-10">
          {years.map((y) => (
            <section key={y}>
              <h2 className="text-xl font-bold text-fg">{y}</h2>
              <div className="mt-3 rounded-2xl bg-surface px-5 py-1 shadow-sm ring-1 ring-line">
                <NewsList items={all.filter((n) => n.date.getUTCFullYear() === y)} />
              </div>
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}
