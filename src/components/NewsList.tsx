import { type News, fmtMonth } from "@/lib/content";

export default function NewsList({ items }: { items: News[] }) {
  return (
    <ol className="divide-y divide-line">
      {items.map((n) => (
        <li key={n.slug} className="grid gap-1 py-4 sm:grid-cols-[6.5rem_1fr] sm:gap-4">
          <time dateTime={n.date.toISOString()} className="font-mono text-[13px] font-medium text-accent">
            {fmtMonth(n.date)}
          </time>
          <span className="text-[15px] leading-relaxed text-fg-2">
            {n.link ? (
              <a href={n.link} {...(n.link.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})} className="transition hover:text-accent">{n.title}</a>
            ) : (
              n.title
            )}
          </span>
        </li>
      ))}
    </ol>
  );
}
