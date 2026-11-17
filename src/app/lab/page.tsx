import type { Metadata } from "next";
import Link from "next/link";
import { getPeople, getProjects } from "@/lib/content";
import { profile } from "@/lib/site";
import { Container, MoreLink, PageHeader } from "@/components/ui";
import ProjectCard from "@/components/ProjectCard";

export const metadata: Metadata = {
  title: "Ahsan’s Lab",
  description: "Ahsan's Lab (2018 – June 2024): a student research group in Chittagong for robotics, IoT and agri-tech. Now archived; its alumni work and study around the world.",
};

export default function LabPage() {
  const people = getPeople();
  // Only projects built at the lab: ICIQ, industry and open-source work carry their own context.
  const projects = getProjects().filter((p) => !p.context && p.category !== "opensource" && p.category !== "software" && p.image).slice(0, 8);
  const facts = [
    { v: "2018–24", l: "Active years" },
    { v: "25+", l: "Prototypes built" },
    { v: "6", l: "Peer-reviewed papers" },
    { v: String(people.length), l: "Alumni fellows" },
  ];

  return (
    <>
      <PageHeader eyebrow="Ahsan’s Lab · Chittagong, Bangladesh · 2018–2024" title="A small lab with a simple idea: build things that help">
        I started Ahsan’s Lab in 2018 to give motivated students a place to learn by building. We made robots, IoT devices and automation for problems in sanitation, agriculture, health and education, and several projects became peer-reviewed papers. The lab ran until June 2024, when I joined ICIQ. It is now archived, and its fellows have moved on to graduate study and industry around the world.
      </PageHeader>

      <Container className="py-14">
        <p className="mb-8 rounded-2xl bg-accent-soft px-5 py-4 text-sm text-fg-2 ring-1 ring-line">
          <span className="font-semibold text-fg">Archived lab.</span> Ahsan’s Lab is no longer active and is not taking new members. This page keeps a record of its work and of the people who built it. My current research is at ICIQ in Spain: see <Link href="/research/" className="font-semibold text-accent hover:underline">Research</Link>.
        </p>
        <dl className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {facts.map((f) => (
            <div key={f.l} className="rounded-2xl bg-surface p-5 text-center shadow-sm ring-1 ring-line">
              <dd className="bg-linear-to-r from-accent to-accent-2 bg-clip-text text-3xl font-bold text-transparent">{f.v}</dd>
              <dt className="mt-1 text-sm text-fg-2">{f.l}</dt>
            </div>
          ))}
        </dl>

        <h2 className="mt-16 text-2xl font-bold text-fg">Alumni: where they are now</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {people.map((p) => {
            const initials = p.name.split(" ").filter((w) => !w.endsWith(".")).map((w) => w[0]).slice(0, 2).join("");
            return (
              <div key={p.slug} className="flex gap-4 rounded-2xl bg-surface p-5 shadow-sm ring-1 ring-line">
                {p.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.photo} alt="" className="size-12 shrink-0 rounded-full object-cover" />
                ) : (
                  <span className="grid size-12 shrink-0 place-items-center rounded-full bg-linear-to-br from-cyan-600 to-violet-600 text-sm font-bold text-white">{initials}</span>
                )}
                <div>
                  <h3 className="font-semibold text-fg">
                    {p.scholar ? <a href={p.scholar} target="_blank" rel="noopener" className="hover:text-accent">{p.name}</a> : p.name}
                  </h3>
                  <p className="text-sm text-fg-2">{p.now}</p>
                  <p className="text-sm text-muted">{p.affiliation}</p>
                  {p.publications ? <p className="mt-1 text-xs font-medium text-accent">{p.publications} publication{p.publications > 1 ? "s" : ""}</p> : null}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-2xl font-bold text-fg">Built at the lab</h2>
          <MoreLink href="/projects/">All projects</MoreLink>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((p) => <ProjectCard key={p.slug} p={p} />)}
        </div>

        <p className="mt-12 text-sm text-muted">
          The original lab website, with more photos and media coverage, is archived at{" "}
          <a href={profile.links.lab} target="_blank" rel="noopener" className="text-accent hover:underline">sites.google.com/view/ahsanslab</a>.
        </p>
      </Container>
    </>
  );
}
