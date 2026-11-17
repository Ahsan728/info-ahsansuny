// Build-time content loading. Everything the site shows lives in /content (Markdown)
// and /data (JSON + BibTeX); edit those files and rebuild.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { parseBibtex, type Publication } from "./bibtex";

const ROOT = process.cwd();
const CONTENT = path.join(ROOT, "content");

type Raw<T> = T & { slug: string; body: string };

function readCollection<T>(dir: string, required: (keyof T)[]): Raw<T>[] {
  const full = path.join(CONTENT, dir);
  return fs
    .readdirSync(full)
    .filter((f) => /\.mdx?$/.test(f))
    .map((f) => {
      const { data, content } = matter(fs.readFileSync(path.join(full, f), "utf8"));
      for (const key of required) {
        if (data[key as string] === undefined || data[key as string] === "") {
          throw new Error(`content/${dir}/${f}: missing required field "${String(key)}"`);
        }
      }
      return { ...(data as T), slug: f.replace(/\.mdx?$/, ""), body: content };
    });
}

/* ---------------- Types ---------------- */
export type Link = { label: string; url: string };

export type Research = Raw<{
  title: string;
  summary: string;
  institution: string;
  period: string;
  order?: number;
  status?: "current" | "past";
  tags?: string[];
  image?: string;
  /** "contain" for diagrams and renders that must not be cropped. */
  imageFit?: "cover" | "contain";
  gallery?: string[];
  links?: Link[];
  featured?: boolean;
}>;

export type ProjectCategory = "software" | "iot" | "robotics" | "agritech" | "automation" | "opensource";
export type Project = Raw<{
  title: string;
  summary: string;
  category: ProjectCategory;
  context?: string;
  year?: number;
  tags?: string[];
  image?: string;
  /** "contain" for diagrams that must not be cropped on the card. */
  imageFit?: "cover" | "contain";
  gallery?: string[];
  videos?: string[];
  repo?: string;
  link?: string;
  paper?: string;
  source?: string;
  featured?: boolean;
}>;

export type News = Raw<{
  date: Date;
  title: string;
  category?: string;
  link?: string;
}>;

export type Post = Raw<{
  title: string;
  description: string;
  date: Date;
  lang?: "en" | "bn";
  category?: "technical" | "graduation-life" | "travel" | "stories";
  series?: string;
  part?: number;
  external?: string;
  source?: string;
  draft?: boolean;
  cover?: string;
}>;

/** Writing series shown on /blog. Posts join a series with `series: <key>` in front matter. */
export const blogSeries = [
  {
    key: "robotics-hatekhori",
    group: "technical",
    title: "রোবোটিক্সে হাতেখড়ি",
    en: "Robotics for Beginners",
    lang: "bn",
    description: "A Bengali introduction to electronics, microcontrollers and sensors for young makers, published on Biggan Jatra.",
  },
  {
    key: "microcontroller-notes",
    group: "technical",
    title: "Microcontroller & Electronics",
    en: "Technical notes",
    lang: "en",
    description: "Practical notes on setting up and programming microcontroller boards.",
  },
  {
    key: "snataker-dingulir-sholo-ana",
    group: "stories",
    title: "স্নাতকের দিনগুলির ষোলআনা",
    en: "Graduation Life",
    lang: "bn",
    description:
      "A 42-part memoir of my undergraduate years in Electrical & Electronic Engineering at Premier University, Chittagong, written week by week in 2020–21.",
  },
  {
    key: "musafirer-beshe",
    group: "stories",
    title: "মুসাফিরের বেশে",
    en: "Travelling",
    lang: "bn",
    description: "Travel stories from the hills, rivers and islands of Bangladesh: Dhuppani, the Lushai river, Sandwip and more.",
  },
  {
    key: "du-poishar-lekhok",
    group: "stories",
    title: "দু পয়সার লেখক",
    en: "Short Stories",
    lang: "bn",
    description: "Short fiction in Bengali.",
  },
] as const;

/** Posts of one series in reading order. */
export function seriesPosts(key: string) {
  return getPosts()
    .filter((p) => p.series === key)
    .sort((a, b) => (a.part ?? 0) - (b.part ?? 0) || +a.date - +b.date);
}

export type Achievement = Raw<{
  year: number;
  title: string;
  type: "award" | "media" | "talk" | "invited" | "teaching" | "scholarship" | "certificate";
  /** One short line shown under the title: date, format, topics. */
  note?: string;
  org?: string;
  link?: string;
  /** Text for a separate visible link, e.g. the outlet name for media coverage. */
  linkLabel?: string;
  /** Several labelled links, e.g. one per news outlet. */
  links?: Link[];
}>;

export type Person = Raw<{
  name: string;
  now: string;
  affiliation: string;
  publications?: number;
  scholar?: string;
  photo?: string;
  order?: number;
}>;

/* ---------------- Collections ---------------- */
export const getResearch = () =>
  readCollection<Research>("research", ["title", "summary", "institution", "period"]).sort(
    (a, b) => (a.order ?? 99) - (b.order ?? 99),
  );

export const getProjects = () =>
  readCollection<Project>("projects", ["title", "summary", "category"]).sort(
    (a, b) => Number(!!b.featured) - Number(!!a.featured) || (b.year ?? 0) - (a.year ?? 0) || a.title.localeCompare(b.title),
  );

export const getNews = () =>
  readCollection<News>("news", ["date", "title"])
    .map((n) => ({ ...n, date: new Date(n.date) }))
    .sort((a, b) => +b.date - +a.date);

/** Drafts are visible in `npm run dev` only. */
export const getPosts = () =>
  readCollection<Post>("blog", ["title", "description", "date"])
    .map((p) => ({ ...p, date: new Date(p.date) }))
    .filter((p) => process.env.NODE_ENV === "development" || !p.draft)
    .sort((a, b) => +b.date - +a.date);

export const getAchievements = () =>
  readCollection<Achievement>("achievements", ["year", "title", "type"]).sort((a, b) => b.year - a.year);

export const getPeople = () =>
  readCollection<Person>("people", ["name", "now", "affiliation"]).sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

export function getPublications(): Publication[] {
  return parseBibtex(fs.readFileSync(path.join(ROOT, "data", "publications.bib"), "utf8"));
}

/* ---------------- Helpers ---------------- */
export const projectCategories: { key: ProjectCategory; title: string; blurb: string }[] = [
  { key: "software", title: "Lab software & instrument agentic automation", blurb: "Internal tools I built at ICIQ: agentic instrument drivers and firmware. Source code is private to ICIQ." },
  { key: "opensource", title: "Code & open source", blurb: "Public code from my research, studies and teaching, on GitHub." },
  { key: "automation", title: "Automation & machines", blurb: "Mechanised solutions for everyday tasks." },
  { key: "iot", title: "IoT & embedded systems", blurb: "Connected devices for health, safety, education and energy." },
  { key: "robotics", title: "Robotics & mechatronics", blurb: "Mobile robots, walking machines and motion systems." },
  { key: "agritech", title: "Agri-tech & environment", blurb: "Technology for farms, food and cleaner rivers." },
];

export function projectContext(p: Project): string {
  if (p.context) return p.context;
  if (p.category === "opensource") return "Open source · GitHub";
  return p.year ? `Ahsan’s Lab · ${p.year}` : "Ahsan’s Lab";
}

export function readingTime(body: string): number {
  const words = body.replace(/```[\s\S]*?```/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export const fmtMonth = (d: Date) =>
  d.toLocaleDateString("en-GB", { month: "short", year: "numeric", timeZone: "UTC" });
export const fmtLong = (d: Date) =>
  d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
