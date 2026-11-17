import Link from "next/link";
import { nav, profile } from "@/lib/site";
import { GitHubIcon, LinkedInIcon, ScholarIcon, GlobeIcon, OrcidIcon, YouTubeIcon, InstagramIcon } from "./Icons";

const network = [
  { label: "Career Abroad Mentor", href: profile.links.mentor },
  { label: "Language Coach", href: profile.links.language },
  { label: "Ahsan’s Lab archive", href: profile.links.lab },
  { label: "Google Scholar", href: profile.links.scholar },
  { label: "Scopus", href: profile.links.scopus },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-line bg-bg-soft">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-xl font-bold text-fg">
            {profile.short}<span className="text-accent">.</span>
          </p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
            {profile.role}
            <br />
            {profile.affiliation} · {profile.location}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {[
              { href: profile.links.github, label: "GitHub", Icon: GitHubIcon },
              { href: profile.links.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
              { href: profile.links.scholar, label: "Google Scholar", Icon: ScholarIcon },
              { href: profile.links.orcid, label: "ORCID", Icon: OrcidIcon },
              { href: profile.links.youtube, label: "YouTube", Icon: YouTubeIcon },
              { href: profile.links.instagram, label: "Instagram", Icon: InstagramIcon },
              { href: profile.links.mentor, label: "ahsansuny.com", Icon: GlobeIcon },
            ].map(({ href, label, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener" aria-label={label}
                className="grid size-9 place-items-center rounded-full border border-line bg-surface text-fg-2 transition hover:border-accent hover:text-accent">
                <Icon width={16} height={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-fg">Explore</p>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {[...nav, { href: "/contact/", label: "Contact" }].map((n) => (
              <li key={n.href}><Link href={n.href} className="text-muted transition hover:text-accent">{n.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-fg">Network</p>
          <ul className="mt-3 space-y-2 text-sm">
            {network.map((n) => (
              <li key={n.label}><a href={n.href} target="_blank" rel="noopener" className="text-muted transition hover:text-accent">{n.label} ↗</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 px-4 py-5 text-xs text-muted sm:px-6">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <a href="/rss.xml" className="hover:text-accent">RSS feed</a>
        </div>
      </div>
    </footer>
  );
}
