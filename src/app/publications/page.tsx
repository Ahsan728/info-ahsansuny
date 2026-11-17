import type { Metadata } from "next";
import { getPublications } from "@/lib/content";
import { profile } from "@/lib/site";
import { Container, PageHeader } from "@/components/ui";
import PublicationItem from "@/components/PublicationItem";

export const metadata: Metadata = {
  title: "Publications",
  description: `Publications by ${profile.name}: conference papers, a book chapter, theses and reports.`,
};

export default function PublicationsPage() {
  const pubs = getPublications();
  const years = [...new Set(pubs.map((p) => p.year))].sort((a, b) => b - a);

  return (
    <>
      <PageHeader eyebrow="Publications" title="Papers, theses & reports">
        Peer-reviewed IEEE conference papers, a Springer book chapter, theses and technical reports, newest first. Use <b>Bib</b> to copy a citation. The complete list is on{" "}
        <a href={profile.links.scholar} target="_blank" rel="noopener" className="font-semibold text-accent hover:underline">Google Scholar</a>,{" "}
        <a href={profile.links.scopus} target="_blank" rel="noopener" className="font-semibold text-accent hover:underline">Scopus</a> and{" "}
        <a href={profile.links.orcid} target="_blank" rel="noopener" className="font-semibold text-accent hover:underline">ORCID</a>.
      </PageHeader>

      <Container className="py-12">
        <div className="mx-auto max-w-4xl">
          {years.map((y) => (
            <section key={y} className="mt-8 first:mt-0">
              <h2 className="border-b border-line pb-2 text-right text-2xl font-light text-muted">{y}</h2>
              <ol className="divide-y divide-line">
                {pubs.filter((p) => p.year === y).map((p) => <PublicationItem key={p.key} pub={p} />)}
              </ol>
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}
