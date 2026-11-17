import type { Metadata } from "next";
import Link from "next/link";
import { getResearch } from "@/lib/content";
import { profile } from "@/lib/site";
import { Container, PageHeader, Pill } from "@/components/ui";
import { ArrowRight } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Research",
  description: "Research in laboratory automation, embedded systems, hardware security and robotics.",
};

export default function ResearchPage() {
  const all = getResearch();
  const current = all.filter((r) => r.status === "current");
  const past = all.filter((r) => r.status !== "current");

  return (
    <>
      <PageHeader eyebrow="Research" title="Robots, instruments and AI for autonomous science">
        I build the embedded hardware and software behind experiments: a self-driving lab for catalysis with agentic and edge AI at ICIQ, a high-power photoreactor before that, power measurement at Schneider Electric, secure embedded targets at Grenoble INP, and low-cost robots in Bangladesh.
        <div className="mt-5 flex flex-wrap gap-2">{profile.interests.map((i) => <Pill key={i}>{i}</Pill>)}</div>
      </PageHeader>

      <Container className="py-14">
        {current.map((r) => (
          <Link key={r.slug} href={`/research/${r.slug}/`}
            className="group grid overflow-hidden rounded-3xl bg-linear-to-br from-cyan-700 to-violet-700 text-white shadow-lg transition hover:shadow-xl md:grid-cols-[1.3fr_1fr]">
            <div className="p-8 sm:p-10">
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">Current research · {r.period}</span>
              <h2 className="mt-4 max-w-3xl text-2xl font-bold text-white! sm:text-3xl">{r.title}</h2>
              <p className="mt-1 text-white/80">{r.institution}</p>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/90">{r.summary}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 font-semibold">
                Read more <ArrowRight width={16} height={16} className="transition-transform group-hover:translate-x-1" />
              </span>
            </div>
            {r.image ? (
              <div className="relative min-h-56 overflow-hidden bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={r.image} alt="" className="absolute inset-0 size-full object-contain p-4 transition duration-500 group-hover:scale-[1.04]" />
              </div>
            ) : (
              <ClosedLoop />
            )}
          </Link>
        ))}

        <h2 className="mt-16 text-2xl font-bold text-fg">Previous research</h2>
        <div className="mt-6 grid gap-5">
          {past.map((r) => (
            <Link key={r.slug} href={`/research/${r.slug}/`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_12px_40px_-12px_var(--glow)] sm:flex-row">
              {r.image && (
                <div className="relative aspect-[16/10] shrink-0 overflow-hidden bg-white sm:aspect-auto sm:min-h-52 sm:w-1/3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={r.image} alt="" loading="lazy" className={`absolute inset-0 size-full transition ${r.imageFit === "contain" ? "object-contain p-3" : "object-cover"} duration-500 group-hover:scale-[1.04]`} />
                </div>
              )}
              <div className="flex flex-1 flex-col p-6">
                <p className="text-sm font-semibold text-accent">{r.period}</p>
                <h3 className="mt-1 text-lg font-semibold text-fg group-hover:text-accent">{r.title}</h3>
                <p className="text-sm text-muted">{r.institution}</p>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-fg-2">{r.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">{(r.tags ?? []).map((t) => <Pill key={t}>{t}</Pill>)}</div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}

/** Self-driving lab loop, shown when the current project has no figure yet. */
function ClosedLoop() {
  const steps = ["Robotic synthesis", "Edge AI sensing", "AI agent decides", "Next experiment"];
  return (
    <div className="relative flex min-h-64 items-center justify-center p-8">
      <div aria-hidden className="absolute size-56 rounded-full border-2 border-dashed border-white/30 motion-safe:animate-[spin_40s_linear_infinite]" />
      <ol className="relative grid grid-cols-2 gap-3 text-center" aria-label="Closed-loop cycle">
        {steps.map((s, i) => (
          <li key={s} className="rounded-2xl bg-white/12 px-4 py-3 text-sm font-semibold backdrop-blur-sm ring-1 ring-white/25">
            <span className="block font-mono text-xs text-white/70">0{i + 1}</span>
            {s}
          </li>
        ))}
      </ol>
    </div>
  );
}
