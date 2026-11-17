import profile from "../../data/profile.json";
import timeline from "../../data/timeline.json";
import skills from "../../data/skills.json";

export { profile, timeline, skills };

export const SITE_URL = "https://info.ahsansuny.com";

export const nav = [
  { href: "/about/", label: "About" },
  { href: "/research/", label: "Research" },
  { href: "/publications/", label: "Publications" },
  { href: "/projects/", label: "Projects" },
  { href: "/achievements/", label: "Achievements" },
  { href: "/lab/", label: "Lab" },
  { href: "/news/", label: "News" },
  { href: "/blog/", label: "Blogs" },
];

/** Logos shown on the About page. `logoDark`: variant with light lettering for dark mode. */
export const institutions = [
  { name: "ICIQ: Institute of Chemical Research of Catalonia", short: "ICIQ", role: "PhD Researcher · former RSE", logo: "/images/logos/iciq.svg", logoDark: "/images/logos/iciq-dark.png", href: "https://www.iciq.org", h: "h-11" },
  { name: "Universitat Rovira i Virgili", short: "URV", role: "PhD Researcher", logo: "/images/logos/urv.png", logoDark: "/images/logos/urv-dark.png", href: "https://www.urv.cat", h: "h-16" },
  { name: "Grenoble INP: Esisar", short: "Grenoble INP", role: "M.Sc. Embedded Systems", logo: "/images/logos/grenoble-inp-esisar.png", logoDark: "/images/logos/grenoble-inp-esisar-dark.png", href: "https://esisar.grenoble-inp.fr", h: "h-11" },
  { name: "Schneider Electric", short: "Schneider Electric", role: "Electronic Design Engineer Intern", logo: "/images/logos/schneider-electric.svg", href: "https://www.se.com", h: "h-10" },
  { name: "Premier University, Chittagong", short: "Premier University", role: "B.Sc. EEE", logo: "/images/logos/premier-university.png", href: "https://www.puc.ac.bd", h: "h-14" },
];

export const ventures = [
  {
    title: "Ahsan’s Lab",
    role: "Founder",
    href: "/lab/",
    text: "A student research group I founded in Chittagong (2018 – June 2024, now archived). It built 25+ robotics, IoT and agri-tech prototypes and published six papers.",
  },
  {
    title: "Career Abroad Mentor",
    role: "Mentor",
    href: profile.links.mentor,
    text: "One-to-one guidance for students going abroad for higher study: scholarships, admissions and visas.",
  },
  {
    title: "Language Coach",
    role: "Creator",
    href: profile.links.language,
    text: "French and Spanish from A1 to B2, taught through Bengali and English, with daily practice.",
  },
];
