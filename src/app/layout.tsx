import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Noto_Sans_Bengali, Space_Grotesk } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { profile, SITE_URL } from "@/lib/site";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const grotesk = Space_Grotesk({ variable: "--font-grotesk", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });
const bengali = Noto_Sans_Bengali({ variable: "--font-bn", subsets: ["bengali"], weight: ["400", "600"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${profile.name} (${profile.short})`, template: `%s · ${profile.short}` },
  description: profile.tagline,
  alternates: { canonical: "./", types: { "application/rss+xml": "/rss.xml" } },
  openGraph: {
    type: "website",
    siteName: profile.short,
    images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: profile.name }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#070b14" },
  ],
};

// Runs before first paint: saved choice, else the OS setting.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d)}catch(e){}})()`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  alternateName: profile.short,
  url: SITE_URL,
  image: `${SITE_URL}${profile.photo}`,
  jobTitle: profile.role,
  affiliation: [
    { "@type": "Organization", name: "Institute of Chemical Research of Catalonia (ICIQ)" },
    { "@type": "CollegeOrUniversity", name: "Universitat Rovira i Virgili" },
  ],
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Grenoble INP" },
    { "@type": "CollegeOrUniversity", name: "Premier University, Chittagong" },
  ],
  sameAs: Object.values(profile.links).filter(Boolean),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${grotesk.variable} ${mono.variable} ${bengali.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-screen flex-col">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[100] focus:rounded-md focus:bg-surface focus:px-3 focus:py-2 focus:shadow">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">{children}</main>
        <SiteFooter />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </body>
    </html>
  );
}
