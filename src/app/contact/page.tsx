import type { Metadata } from "next";
import { profile } from "@/lib/site";
import { Container, PageHeader } from "@/components/ui";
import { ArrowUpRight, BookIcon, GitHubIcon, GlobeIcon, InstagramIcon, LinkedInIcon, MailIcon, OrcidIcon, PinIcon, ScholarIcon, YouTubeIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${profile.name}.`,
};

export default function ContactPage() {
  const channels = [
    profile.email && { label: "Email", value: profile.email, href: `mailto:${profile.email}`, Icon: MailIcon },
    { label: "LinkedIn", value: "in/eeehsan94", href: profile.links.linkedin, Icon: LinkedInIcon },
    { label: "GitHub", value: "Ahsan728", href: profile.links.github, Icon: GitHubIcon },
    { label: "Google Scholar", value: "Publications & citations", href: profile.links.scholar, Icon: ScholarIcon },
    { label: "Scopus", value: "Author ID 57219988312", href: profile.links.scopus, Icon: BookIcon },
    profile.links.orcid && { label: "ORCID", value: profile.links.orcid.replace("https://orcid.org/", ""), href: profile.links.orcid, Icon: OrcidIcon },
    { label: "YouTube", value: "@AhsanSuny", href: profile.links.youtube, Icon: YouTubeIcon },
    { label: "Instagram", value: "@ahsan_suny728", href: profile.links.instagram, Icon: InstagramIcon },
    { label: "Mentoring", value: "ahsansuny.com", href: profile.links.mentor, Icon: GlobeIcon },
  ].filter(Boolean) as { label: string; value: string; href: string; Icon: typeof MailIcon }[];

  return (
    <>
      <PageHeader eyebrow="Contact" title="Let’s talk">
        I’m happy to hear about research collaborations, embedded and automation projects, speaking invitations, or questions from students planning to study abroad.
      </PageHeader>
      <Container className="py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {channels.map(({ label, value, href, Icon }) => (
            <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener"
              className="group flex items-center gap-4 rounded-2xl bg-surface p-5 shadow-sm ring-1 ring-line transition hover:-translate-y-0.5 hover:shadow-md hover:ring-accent/40">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent"><Icon width={20} height={20} /></span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold text-fg group-hover:text-accent">{label}</span>
                <span className="block truncate text-sm text-muted">{value}</span>
              </span>
              <ArrowUpRight width={16} height={16} className="text-muted group-hover:text-accent" />
            </a>
          ))}
        </div>
        <p className="mt-10 flex items-center gap-2 text-fg-2">
          <PinIcon width={18} height={18} className="text-accent" /> Based in {profile.location}, at {profile.affiliation}.
        </p>
      </Container>
    </>
  );
}
