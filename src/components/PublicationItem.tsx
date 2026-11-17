"use client";

import { useState } from "react";
import type { Publication } from "@/lib/bibtex";

const KIND_COLOR: Record<Publication["kind"], string> = {
  conference: "bg-cyan-600 dark:bg-cyan-500/90",
  journal: "bg-indigo-600 dark:bg-indigo-500",
  thesis: "bg-violet-600 dark:bg-violet-500",
  report: "bg-slate-500",
  other: "bg-slate-500",
};

/** al-folio style entry: venue badge, title, authors, venue, and inline Abstract / BibTeX panels. */
export default function PublicationItem({ pub, me = "Ahsan" }: { pub: Publication; me?: string }) {
  const [panel, setPanel] = useState<"abs" | "bib" | null>(null);
  const [copied, setCopied] = useState(false);
  const toggle = (p: "abs" | "bib") => setPanel((cur) => (cur === p ? null : p));

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(pub.bibtex);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable: the text is selectable */
    }
  };

  const btn = "rounded-md border px-2.5 py-1 text-xs font-semibold uppercase tracking-wide transition";
  const btnIdle = "border-line text-fg-2 hover:border-accent hover:text-accent";
  const btnOn = "border-accent bg-accent text-accent-fg";

  return (
    <li id={pub.key} className="grid gap-3 py-6 sm:grid-cols-[7rem_1fr] sm:gap-6">
      <div className="flex sm:flex-col sm:gap-2">
        <span className={`inline-block rounded-md px-2 py-1.5 text-center text-xs font-bold leading-tight text-white sm:w-full ${KIND_COLOR[pub.kind]}`}>
          {pub.abbr}
        </span>
        {pub.preview && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={pub.preview} alt="" className="hidden w-full rounded-md border border-line sm:block" />
        )}
      </div>

      <div className="min-w-0">
        <p className="font-display text-[17px] font-semibold leading-snug text-fg">
          {pub.url ? (
            <a href={pub.url} target="_blank" rel="noopener" className="transition hover:text-accent">{pub.title}</a>
          ) : (
            pub.title
          )}
        </p>
        <p className="mt-1.5 text-sm text-fg-2">
          {pub.authors.map((a, i) => (
            <span key={i}>
              {a.includes(me) ? <strong className="font-semibold text-fg underline decoration-accent/60 decoration-2 underline-offset-2">{a}</strong> : a}
              {i < pub.authors.length - 2 ? ", " : i === pub.authors.length - 2 ? ", and " : ""}
            </span>
          ))}
        </p>
        <p className="mt-0.5 text-sm text-muted">
          <em>{pub.venue}</em>
          {pub.year ? `, ${pub.year}` : ""}
          {pub.note ? ` · ${pub.note}` : ""}
        </p>
        {pub.award && <p className="mt-1 text-sm font-semibold text-amber-600 dark:text-amber-400">🏅 {pub.award}</p>}

        <div className="mt-3 flex flex-wrap gap-2">
          {pub.abstract && (
            <button type="button" aria-expanded={panel === "abs"} onClick={() => toggle("abs")} className={`${btn} ${panel === "abs" ? btnOn : btnIdle}`}>
              Abs
            </button>
          )}
          <button type="button" aria-expanded={panel === "bib"} onClick={() => toggle("bib")} className={`${btn} ${panel === "bib" ? btnOn : btnIdle}`}>
            Bib
          </button>
          {pub.pdf && <a href={pub.pdf} target="_blank" rel="noopener" className={`${btn} ${btnIdle}`}>PDF</a>}
          {pub.doi && <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener" className={`${btn} ${btnIdle}`}>DOI</a>}
          {pub.code && <a href={pub.code} target="_blank" rel="noopener" className={`${btn} ${btnIdle}`}>Code</a>}
          {pub.slides && <a href={pub.slides} target="_blank" rel="noopener" className={`${btn} ${btnIdle}`}>Slides</a>}
          {pub.video && <a href={pub.video} target="_blank" rel="noopener" className={`${btn} ${btnIdle}`}>Video</a>}
        </div>

        {panel === "abs" && pub.abstract && (
          <p className="mt-3 rounded-lg border border-line bg-surface-2 p-4 text-sm leading-relaxed text-fg-2">{pub.abstract}</p>
        )}
        {panel === "bib" && (
          <div className="relative mt-3">
            <pre className="overflow-x-auto rounded-lg border border-line bg-surface-2 p-4 pr-20 font-mono text-xs leading-relaxed text-fg-2">{pub.bibtex}</pre>
            <button type="button" onClick={copy} className="absolute right-2 top-2 rounded-md border border-line bg-surface px-2.5 py-1 text-xs font-semibold text-fg-2 hover:text-accent">
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        )}
      </div>
    </li>
  );
}
