import Link from "next/link";
import { type Project, projectContext } from "@/lib/content";
import { card, cardHover } from "./ui";

/** Photo panel: thumbnail, title, one-line context. The whole card links to the project page. */
export default function ProjectCard({ p, showSummary = false }: { p: Project; showSummary?: boolean }) {
  const initials = p.title.replace(/[^A-Za-z ]/g, "").split(" ").filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  return (
    <Link href={`/projects/${p.slug}/`} className={`group flex h-full flex-col overflow-hidden ${card} ${cardHover}`}>
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-2">
        {p.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.image} alt="" loading="lazy" className={`size-full transition duration-500 group-hover:scale-[1.04] ${p.imageFit === "contain" ? "bg-white object-contain p-2" : "object-cover"}`} />
        ) : (
          <span className="bg-grid absolute inset-0 grid place-items-center font-display text-3xl font-bold text-accent/60">{initials}</span>
        )}
        {p.videos?.length ? (
          <span className="absolute right-2.5 top-2.5 rounded-full bg-black/65 px-2 py-0.5 text-[11px] font-semibold text-white backdrop-blur">▶ Video</span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[17px] font-semibold leading-snug transition group-hover:text-accent">{p.title}</h3>
        <p className="mt-1 text-sm text-muted">{projectContext(p)}</p>
        {showSummary && <p className="mt-3 text-sm leading-relaxed text-fg-2">{p.summary}</p>}
      </div>
    </Link>
  );
}
