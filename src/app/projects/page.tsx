import type { Metadata } from "next";
import { getProjects, projectCategories } from "@/lib/content";
import { Container, PageHeader } from "@/components/ui";
import ProjectCard from "@/components/ProjectCard";

export const metadata: Metadata = {
  title: "Projects",
  description: "Robots, IoT devices, automation machines and open-source code, each with photos and a write-up.",
};

export default function ProjectsPage() {
  const projects = getProjects();
  return (
    <>
      <PageHeader eyebrow="Projects" title="Things I have designed and built">
        Lab software and instrument agentic automation from ICIQ, prototypes built at Ahsan’s Lab and in industry, and open-source code from my research. Click a panel to see the full story, with photos and videos.
      </PageHeader>

      <Container className="py-14">
        <nav aria-label="Categories" className="mb-12 flex flex-wrap gap-2">
          {projectCategories.map((c) => (
            <a key={c.key} href={`#${c.key}`} className="rounded-full bg-surface px-4 py-2 text-sm font-medium text-fg-2 shadow-sm ring-1 ring-line transition hover:text-accent hover:ring-accent/40">
              {c.title} <span className="ml-1 text-muted">{projects.filter((p) => p.category === c.key).length}</span>
            </a>
          ))}
        </nav>

        <div className="space-y-16">
          {projectCategories.map((c) => {
            const items = projects.filter((p) => p.category === c.key);
            if (!items.length) return null;
            return (
              <section key={c.key} id={c.key} className="scroll-mt-24">
                <div className="mb-6 border-b border-line pb-3">
                  <h2 className="text-xl font-bold text-fg sm:text-2xl">{c.title}</h2>
                  <p className="mt-1 text-sm text-fg-2">{c.blurb}</p>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((p) => <ProjectCard key={p.slug} p={p} showSummary />)}
                </div>
              </section>
            );
          })}
        </div>
      </Container>
    </>
  );
}
