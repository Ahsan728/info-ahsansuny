import type { Metadata } from "next";
import { getAchievements } from "@/lib/content";
import { Container, PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Achievements",
  description: "Awards, scholarships, invited talks, workshops and courses taught, media coverage and certificates.",
};

const groups = [
  { title: "Awards & scholarships", types: ["award", "scholarship"], emoji: "🏆" },
  { title: "Invited talks & seminars", types: ["invited"], emoji: "🎤" },
  { title: "Workshops & courses I taught", types: ["teaching"], emoji: "🧑‍🏫" },
  { title: "Conferences & events", types: ["talk"], emoji: "🌍" },
  { title: "Media coverage", types: ["media"], emoji: "📰" },
  { title: "Courses & certificates", types: ["certificate"], emoji: "📜" },
];

export default function AchievementsPage() {
  const all = getAchievements();
  return (
    <>
      <PageHeader eyebrow="Achievements" title="Recognition along the way">
        Science fairs and competitions in Bangladesh, scholarships in France and Spain, invited talks and workshops I have taught, conferences such as ICRA 2026, and the courses I have completed along the way.
      </PageHeader>
      <Container className="py-12">
        <div className="grid gap-6 lg:grid-cols-2">
          {groups.map((g) => {
            const items = all.filter((a) => g.types.includes(a.type));
            if (!items.length) return null;
            return (
              <section key={g.title} className="rounded-2xl bg-surface p-6 shadow-sm ring-1 ring-line">
                <h2 className="flex items-center gap-2 text-lg font-bold text-fg"><span aria-hidden>{g.emoji}</span>{g.title}</h2>
                <ul className="mt-4 divide-y divide-line">
                  {items.map((a) => (
                    <li key={a.slug} className="grid grid-cols-[3.5rem_1fr] gap-3 py-3">
                      <span className="text-sm font-semibold text-accent">{a.year}</span>
                      <span className="font-body text-[15px] text-fg-2">
                        {a.link ? <a href={a.link} target="_blank" rel="noopener" className="hover:text-accent">{a.title}</a> : a.title}
                        {a.org && <span className="text-muted">, {a.org}</span>}
                        {a.link && (a.type === "certificate" || a.linkLabel) && (
                          <a href={a.link} target="_blank" rel="noopener" className="ml-2 whitespace-nowrap text-xs font-semibold text-accent hover:underline" aria-label={`${a.linkLabel ?? "Credential"}: ${a.title}`}>
                            {a.linkLabel ?? "Credential"} ↗
                          </a>
                        )}
                        {a.links?.map((l) => (
                          <a key={l.url} href={l.url} target="_blank" rel="noopener" className="ml-2 whitespace-nowrap text-xs font-semibold text-accent hover:underline" aria-label={`${l.label}: ${a.title}`}>
                            {l.label} ↗
                          </a>
                        ))}
                        {a.note && <span className="mt-1 block text-sm text-muted">{a.note}</span>}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </Container>
    </>
  );
}
