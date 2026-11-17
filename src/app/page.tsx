import Link from "next/link";
import { getNews, getPeople, getProjects, getPublications, getResearch } from "@/lib/content";
import { profile, timeline, ventures } from "@/lib/site";
import { Container, Eyebrow, MoreLink, Pill, SectionTitle, card, cardHover } from "@/components/ui";
import PublicationItem from "@/components/PublicationItem";
import NewsList from "@/components/NewsList";
import { FlagBD, FlagES, FlagFR } from "@/components/Flags";
import {
  ArrowRight, ArrowUpRight, ChipIcon, DownloadIcon, DroneIcon, GitHubIcon, GlobeIcon, LanguageIcon,
  LinkedInIcon, MailIcon, OrcidIcon, PinIcon, RobotIcon, ScholarIcon, ShieldIcon, UsersIcon,
} from "@/components/Icons";

const researchIcons = [ChipIcon, ShieldIcon, DroneIcon, RobotIcon];
const ventureIcons = [UsersIcon, GlobeIcon, LanguageIcon];

export default function Home() {
  const research = getResearch();
  const current = research.find((r) => r.status === "current") ?? research[0];
  const past = research.filter((r) => r !== current).slice(0, 4);
  const pubs = getPublications();
  const selected = pubs.filter((p) => p.selected);
  const allProjects = getProjects();
  const news = getNews().slice(0, 6);
  const fellows = getPeople().length;
  const journey = timeline.filter((t) => t.kind !== "lab").slice(0, 5);

  const socials = [
    { href: profile.links.scholar, label: "Scholar", Icon: ScholarIcon },
    { href: profile.links.orcid, label: "ORCID", Icon: OrcidIcon },
    { href: profile.links.github, label: "GitHub", Icon: GitHubIcon },
    { href: profile.links.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
  ];

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)]" />
        <div aria-hidden className="pointer-events-none absolute -left-40 top-20 size-[30rem] rounded-full bg-accent/15 blur-[110px]" />
        <div aria-hidden className="pointer-events-none absolute -right-32 -top-20 size-[34rem] rounded-full bg-accent-2/15 blur-[120px]" />

        <Container className="relative grid items-center gap-12 py-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:py-24">
          {/* Portrait */}
          <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div className="rounded-[2rem] bg-linear-to-br from-accent via-accent-2/70 to-transparent p-[2px] shadow-[0_30px_80px_-30px_var(--glow)]">
              {/* Light mode: original photo. Dark mode: studio version on a dark teal–violet background. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={profile.portrait}
                alt={`Portrait of ${profile.name}`}
                width={800}
                height={1000}
                fetchPriority="high"
                className="aspect-[4/5] w-full rounded-[calc(2rem-2px)] object-cover dark:hidden"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={profile.portraitDark}
                alt={`Portrait of ${profile.name}`}
                width={800}
                height={1000}
                fetchPriority="high"
                className="hidden aspect-[4/5] w-full rounded-[calc(2rem-2px)] object-cover dark:block"
              />
            </div>

            {/* Floating badges */}
            <div className="absolute -left-3 bottom-8 flex items-center gap-3 rounded-2xl border border-line bg-surface/85 px-4 py-3 shadow-lg backdrop-blur-md sm:-left-6">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
              </span>
              <div className="leading-tight">
                <p className="text-[11px] font-medium uppercase tracking-wider text-muted">Currently</p>
                <p className="text-sm font-semibold text-fg">PhD @ ICIQ · URV</p>
              </div>
            </div>
          </div>

          {/* Intro */}
          <div>
            <Eyebrow>Hello, I’m</Eyebrow>
            <h1 className="mt-3 text-[2.6rem] font-bold leading-[1.05] sm:text-6xl">{profile.name}</h1>
            <p className="mt-2 text-lg text-muted">
              aka <span className="font-medium text-fg-2">{profile.short}</span>
            </p>
            <p className="mt-5 font-display text-2xl font-semibold leading-snug sm:text-3xl">
              <span className="text-gradient">{profile.headline}</span>
            </p>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-fg-2">{profile.heroBio}</p>

            <p className="mt-5 flex items-center gap-2 text-sm text-muted">
              <PinIcon width={16} height={16} className="text-accent" /> {profile.location}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/research/" className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-fg shadow-[0_10px_30px_-10px_var(--glow)] transition hover:brightness-110">
                Explore my research <ArrowRight width={16} height={16} />
              </Link>
              {profile.cv.academic ? (
                <a href={profile.cv.academic} className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3 text-sm font-semibold text-fg transition hover:border-accent hover:text-accent">
                  <DownloadIcon width={16} height={16} /> Download CV
                </a>
              ) : (
                <Link href="/contact/" className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3 text-sm font-semibold text-fg transition hover:border-accent hover:text-accent">
                  <MailIcon width={16} height={16} /> Get in touch
                </Link>
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {socials.map(({ href, label, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener"
                  className="inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-2 text-sm text-fg-2 transition hover:border-accent hover:text-accent">
                  <Icon width={15} height={15} /> {label}
                </a>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ================= AT A GLANCE (bento) ================= */}
      <section className="border-t border-line bg-bg-soft py-20">
        <Container>
          <SectionTitle eyebrow="At a glance" title="Research, engineering, mentoring" />
          <div className="grid gap-4 md:grid-cols-6">
            {/* Current research: big tile */}
            <Link href={`/research/${current.slug}/`}
              className={`group relative overflow-hidden p-7 md:col-span-4 md:row-span-2 ${card} ${cardHover}`}>
              <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-accent/15 blur-3xl" />
              <Pill>Current research</Pill>
              <h3 className="mt-5 max-w-lg text-2xl font-bold leading-tight sm:text-3xl">{current.title}</h3>
              <p className="mt-2 text-sm text-muted">{current.institution} · {current.period}</p>
              <p className="mt-4 max-w-xl leading-relaxed text-fg-2">{current.summary}</p>
              <div className="mt-6 flex flex-wrap gap-2">{(current.tags ?? []).map((t) => <Pill key={t} tone="plain">{t}</Pill>)}</div>
              <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                Read more <ArrowRight width={15} height={15} className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>

            <Link href="/projects/" className={`group p-6 md:col-span-2 ${card} ${cardHover}`}>
              <p className="font-display text-5xl font-bold text-gradient">{allProjects.length}+</p>
              <p className="mt-2 font-semibold text-fg">Projects & prototypes</p>
              <p className="mt-1 text-sm text-muted">Robots, IoT devices and machines, plus open-source code.</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                See all projects <ArrowRight width={14} height={14} className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
            <div className={`p-6 md:col-span-2 ${card}`}>
              <p className="font-display text-5xl font-bold text-gradient">{fellows}</p>
              <p className="mt-2 font-semibold text-fg">Lab fellows mentored</p>
              <p className="mt-1 text-sm text-muted">Now at CNRS, Western Carolina, Buffalo State and more.</p>
            </div>

            <div className={`p-6 md:col-span-2 ${card}`}>
              <p className="text-sm font-semibold text-fg">The journey</p>
              <ol className="relative mt-5 grid grid-cols-3 text-center">
                <span aria-hidden className="absolute left-[16%] right-[16%] top-5 h-px bg-linear-to-r from-accent via-accent-2 to-accent" />
                {[
                  { Flag: FlagBD, c: "Bangladesh", d: "B.Sc. · Lab" },
                  { Flag: FlagFR, c: "France", d: "M.Sc. · Schneider" },
                  { Flag: FlagES, c: "Spain", d: "PhD · ICIQ" },
                ].map(({ Flag, c, d }, i) => (
                  <li key={c} className="relative flex flex-col items-center">
                    <span className={`relative size-10 overflow-hidden rounded-full ring-2 ring-offset-2 ring-offset-surface ${i === 2 ? "ring-accent" : "ring-line"}`}>
                      <Flag className="size-full" />
                    </span>
                    <p className="mt-2 text-xs font-semibold text-fg">{c}</p>
                    <p className="text-[11px] text-muted">{d}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div className={`p-6 md:col-span-2 ${card}`}>
              <p className="text-sm font-semibold text-fg">Interests</p>
              <div className="mt-4 flex flex-wrap gap-2">{profile.interests.map((i) => <Pill key={i}>{i}</Pill>)}</div>
            </div>
            <a href={profile.links.mentor} target="_blank" rel="noopener" className={`group p-6 md:col-span-2 ${card} ${cardHover}`}>
              <p className="text-sm font-semibold text-fg">Studying abroad?</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">I mentor students on scholarships, admissions and visas through Career Abroad Mentor.</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                Book a session <ArrowUpRight width={14} height={14} />
              </span>
            </a>
          </div>
        </Container>
      </section>

      {/* ================= JOURNEY / EXPERIENCE ================= */}
      <section className="py-20">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionTitle eyebrow="Experience" title="Where I’ve worked & studied" description="From building robots in Chittagong to securing embedded systems in France and building a self-driving lab in Spain." />
            <MoreLink href="/about/">Full background & skills</MoreLink>
          </div>
          <ol className="space-y-4">
            {journey.map((t) => (
              <li key={t.title} className={`p-6 ${card} hover:border-accent/40`}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-xs font-medium text-accent">{t.date}</span>
                  <span className="text-xs text-muted">{t.place}</span>
                </div>
                <h3 className="mt-2 text-lg font-semibold">{t.title}</h3>
                <p className="text-sm font-medium text-fg-2">{t.org}</p>
                {t.note && <p className="mt-2 text-sm leading-relaxed text-muted">{t.note}</p>}
                {t.tags && <div className="mt-3 flex flex-wrap gap-1.5">{t.tags.map((x) => <Pill key={x} tone="plain">{x}</Pill>)}</div>}
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ================= RESEARCH HIGHLIGHTS ================= */}
      <section className="border-t border-line bg-bg-soft py-20">
        <Container>
          <SectionTitle eyebrow="Research" title="Previous research" description="Data acquisition, hardware security, drones and applied robotics." href="/research/" linkLabel="All research" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {past.map((r, i) => {
              const Icon = researchIcons[i % researchIcons.length];
              return (
                <Link key={r.slug} href={`/research/${r.slug}/`} className={`group flex flex-col overflow-hidden ${card} ${cardHover}`}>
                  <div className="relative aspect-[4/3] overflow-hidden bg-white">
                    {r.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={r.image} alt="" loading="lazy" className="size-full object-cover transition duration-500 group-hover:scale-[1.04]" />
                    ) : (
                      <span className="bg-grid grid size-full place-items-center bg-surface-2 text-accent"><Icon width={40} height={40} /></span>
                    )}
                    <span className="absolute left-3 top-3 grid size-9 place-items-center rounded-lg bg-surface/90 text-accent shadow-sm backdrop-blur">
                      <Icon width={18} height={18} />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="font-mono text-xs text-muted">{r.period}</p>
                    <h3 className="mt-1 font-semibold leading-snug transition group-hover:text-accent">{r.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{r.summary}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ================= PUBLICATIONS ================= */}
      <section className="py-20">
        <Container>
          <SectionTitle eyebrow="Publications" title="Selected publications" description="Peer-reviewed IEEE conference papers and a Springer book chapter." href="/publications/" linkLabel="All publications" />
          <ol className={`divide-y divide-line px-5 sm:px-8 ${card}`}>
            {selected.map((p) => <PublicationItem key={p.key} pub={p} />)}
          </ol>
        </Container>
      </section>

      {/* ================= NEWS + VENTURES ================= */}
      <section className="border-t border-line bg-bg-soft py-20">
        <Container className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <SectionTitle eyebrow="Updates" title="Latest news" />
            <div className={`px-6 py-2 ${card}`}>
              <NewsList items={news} />
            </div>
            <div className="mt-5"><MoreLink href="/news/">All news</MoreLink></div>
          </div>
          <div>
            <SectionTitle eyebrow="Beyond research" title="Ventures" />
            <div className="space-y-4">
              {ventures.map((v, i) => {
                const Icon = ventureIcons[i];
                const ext = v.href.startsWith("http");
                return (
                  <Link key={v.title} href={v.href} {...(ext ? { target: "_blank", rel: "noopener" } : {})}
                    className={`group flex gap-4 p-5 ${card} ${cardHover}`}>
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-linear-to-br from-cyan-600 to-violet-600 text-white">
                      <Icon width={21} height={21} />
                    </span>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">{v.role}</p>
                      <h3 className="flex items-center gap-1 font-semibold transition group-hover:text-accent">
                        {v.title} {ext ? <ArrowUpRight width={14} height={14} /> : <ArrowRight width={14} height={14} />}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{v.text}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-24">
        <Container>
          <div className="relative overflow-hidden rounded-3xl border border-line bg-surface px-6 py-14 text-center sm:px-12">
            <div aria-hidden className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
            <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 size-80 -translate-x-1/2 rounded-full bg-accent/20 blur-[100px]" />
            <div className="relative">
              <h2 className="text-3xl font-bold sm:text-4xl">
                Let’s build something <span className="text-gradient">together</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-fg-2">
                Open to research collaborations, embedded and automation projects, talks, and questions from students planning to study abroad.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/contact/" className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-fg transition hover:brightness-110">
                  Contact me
                </Link>
                <a href={profile.links.mentor} target="_blank" rel="noopener" className="rounded-full border border-line px-6 py-3 text-sm font-semibold text-fg transition hover:border-accent hover:text-accent">
                  Book a mentoring session
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
