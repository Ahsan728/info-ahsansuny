import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "./Icons";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

/** Small label above headings: accent line + text. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-2 text-sm font-semibold text-accent">
      <span className="h-px w-6 bg-accent" aria-hidden />
      {children}
    </p>
  );
}

/** Header used by every inner page. */
export function PageHeader({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div aria-hidden className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-32 size-[28rem] rounded-full bg-accent-2/15 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -left-24 top-10 size-72 rounded-full bg-accent/10 blur-3xl" />
      <Container className="relative py-14 sm:py-20">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1 className="mt-3 max-w-3xl text-4xl font-bold sm:text-5xl">{title}</h1>
        {children && <div className="mt-5 max-w-2xl text-lg leading-relaxed text-fg-2">{children}</div>}
      </Container>
    </section>
  );
}

export function SectionTitle({
  eyebrow, title, description, href, linkLabel = "View all",
}: { eyebrow?: string; title: string; description?: string; href?: string; linkLabel?: string }) {
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-2xl">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 className="mt-2 text-3xl font-bold sm:text-4xl">{title}</h2>
        {description && <p className="mt-3 text-[17px] leading-relaxed text-muted">{description}</p>}
      </div>
      {href && <MoreLink href={href}>{linkLabel}</MoreLink>}
    </div>
  );
}

export function MoreLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="group inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
      {children}
      <ArrowRight width={16} height={16} className="transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

export function Pill({ children, tone = "accent" }: { children: ReactNode; tone?: "accent" | "plain" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
        tone === "accent" ? "bg-accent-soft text-accent" : "border border-line bg-surface-2 text-fg-2"
      }`}
    >
      {children}
    </span>
  );
}

/** Card surface used across the site. */
export const card =
  "rounded-2xl border border-line bg-surface transition duration-200";
export const cardHover =
  "hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_12px_40px_-12px_var(--glow)]";
