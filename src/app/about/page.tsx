import type { Metadata } from "next";
import Link from "next/link";
import { institutions, profile, skills, timeline } from "@/lib/site";
import { Container, PageHeader, Pill } from "@/components/ui";
import { DownloadIcon, GitHubIcon, InstagramIcon, LinkedInIcon, OrcidIcon, ScholarIcon, YouTubeIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "About",
  description: `About ${profile.name}: education, experience and skills.`,
};

const kindLabel: Record<string, string> = { education: "Education", work: "Work", lab: "Leadership" };

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About" title="From Chittagong to Grenoble to Tarragona" />

      <Container className="py-14">
        <div className="grid gap-12 lg:grid-cols-[300px_1fr]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={profile.aboutPhoto} alt={`Portrait of ${profile.name}`} className="w-full max-w-[300px] rounded-2xl object-cover shadow-md ring-1 ring-line" />
            <p className="mt-4 text-lg font-semibold text-fg">{profile.name}</p>
            <p className="text-sm text-fg-2">{profile.role}</p>
            <p className="text-sm text-fg-2">{profile.affiliation}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {profile.cv.academic && (
                <a href={profile.cv.academic} className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-fg hover:brightness-110">
                  <DownloadIcon width={15} height={15} /> CV
                </a>
              )}
              {profile.cv.portfolio && (
                <a href={profile.cv.portfolio} title="PCB design & embedded software portfolio (PDF)"
                  className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3.5 py-2 text-sm font-semibold text-fg ring-1 ring-line hover:text-accent hover:ring-accent">
                  <DownloadIcon width={15} height={15} /> Portfolio
                </a>
              )}
              {[
                { href: profile.links.scholar, label: "Scholar", Icon: ScholarIcon },
                { href: profile.links.orcid, label: "ORCID", Icon: OrcidIcon },
                { href: profile.links.github, label: "GitHub", Icon: GitHubIcon },
                { href: profile.links.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
              ].map(({ href, label, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3.5 py-2 text-sm font-medium text-fg-2 ring-1 ring-line hover:text-accent hover:ring-accent">
                  <Icon width={15} height={15} /> {label}
                </a>
              ))}
            </div>
          </aside>

          <div>
            <div className="max-w-3xl space-y-5 text-[17px] leading-relaxed text-fg-2">
              {profile.bio.map((p, i) => <p key={i}>{p}</p>)}
            </div>

            <h2 className="mt-14 text-2xl font-bold text-fg">Institutions</h2>
            <p className="mt-2 text-sm text-muted">Where I have studied, researched and worked.</p>
            <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
              {institutions.map((inst) => (
                <li key={inst.short}>
                  <a href={inst.href} target="_blank" rel="noopener" title={inst.name} className="group flex flex-col items-start gap-3">
                    <span className="flex h-16 items-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={inst.logo} alt={`${inst.name} logo`} loading="lazy"
                        className={`${inst.h} w-auto max-w-[200px] object-contain transition group-hover:scale-105 ${"logoDark" in inst ? "dark:hidden" : ""}`} />
                      {"logoDark" in inst && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={inst.logoDark} alt={`${inst.name} logo`} loading="lazy"
                          className={`${inst.h} hidden w-auto max-w-[200px] object-contain transition group-hover:scale-105 dark:block`} />
                      )}
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-fg group-hover:text-accent">{inst.short}</span>
                      <span className="block text-xs text-muted">{inst.role}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <h2 className="mt-14 text-2xl font-bold text-fg">Education & experience</h2>
            <ol className="relative mt-6 border-l-2 border-line pl-6">
              {timeline.map((t, i) => (
                <li key={i} className="relative pb-8 last:pb-0">
                  <span className={`absolute -left-[33px] top-1 size-4 rounded-full border-4 border-bg ${t.kind === "education" ? "bg-accent-2" : "bg-accent"} shadow`} />
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-accent">{t.date}</span>
                    <Pill tone="plain">{kindLabel[t.kind] ?? t.kind}</Pill>
                  </div>
                  <h3 className="mt-1 text-lg font-semibold text-fg">{t.title}</h3>
                  <p className="text-sm text-fg-2">{t.org} · {t.place}</p>
                  {t.note && <p className="mt-2 text-[15px] leading-relaxed text-fg-2">{t.note}</p>}
                </li>
              ))}
            </ol>

            <h2 className="mt-14 text-2xl font-bold text-fg">Skills</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {skills.map((g) => (
                <div key={g.group} className="rounded-2xl bg-surface p-5 shadow-sm ring-1 ring-line">
                  <h3 className="text-sm font-semibold text-fg">{g.group}</h3>
                  <div className="mt-3 flex flex-wrap gap-2">{g.items.map((s) => <Pill key={s}>{s}</Pill>)}</div>
                </div>
              ))}
            </div>

            <h2 className="mt-14 text-2xl font-bold text-fg">Outside the lab</h2>
            <p className="mt-3 max-w-3xl text-[17px] leading-relaxed text-fg-2">
              Travel, cycling, drone footage and writing. I write stories, travel notes and reflections, many in Bengali, on the{" "}
              <Link href="/blog/" className="font-semibold text-accent hover:underline">blogs</Link> page, and share videos and drone footage on{" "}
              <a href={profile.links.youtube} target="_blank" rel="noopener" className="inline-flex items-center gap-1 font-semibold text-accent hover:underline"><YouTubeIcon width={15} height={15} />YouTube</a> and photos on{" "}
              <a href={profile.links.instagram} target="_blank" rel="noopener" className="inline-flex items-center gap-1 font-semibold text-accent hover:underline"><InstagramIcon width={15} height={15} />Instagram</a>.
            </p>
          </div>
        </div>
      </Container>
    </>
  );
}
