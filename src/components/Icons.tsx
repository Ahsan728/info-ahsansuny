import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = (p: P) => ({ width: 20, height: 20, "aria-hidden": true, ...p });

export const GitHubIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...base(p)}>
    <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
  </svg>
);
export const LinkedInIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...base(p)}>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
  </svg>
);
export const ScholarIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...base(p)}>
    <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14Zm0-24L0 9.5l4.84 3.92A8.96 8.96 0 0 1 12 8a8.96 8.96 0 0 1 7.16 3.42L24 9.5 12 0Z" />
  </svg>
);
export const OrcidIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...base(p)}>
    <path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24ZM7.37 17.5H5.93V7.47h1.44V17.5ZM6.65 6.43a.95.95 0 1 1 0-1.9.95.95 0 0 1 0 1.9Zm3.33 1.04h3.9c3.71 0 5.34 2.65 5.34 5.02 0 2.58-2.01 5.01-5.32 5.01H9.98V7.47Zm1.44 1.3v7.43h2.29c3.26 0 4-2.47 4-3.71 0-2.03-1.29-3.72-4.08-3.72h-2.21Z" />
  </svg>
);
export const YouTubeIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...base(p)}>
    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1 31.4 31.4 0 0 0 .5-5.8 31.4 31.4 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
  </svg>
);
export const InstagramIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" {...base(p)}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <path d="M17.5 6.5h.01" />
  </svg>
);
const Stroke = ({ d, ...p }: P & { d: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...base(p)}>
    <path d={d} />
  </svg>
);
export const GlobeIcon = (p: P) => <Stroke {...p} d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-9-9h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />;
export const MailIcon = (p: P) => <Stroke {...p} d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm0 1 8 7 8-7" />;
export const PinIcon = (p: P) => <Stroke {...p} d="M12 21s-7-6.1-7-11.5a7 7 0 0 1 14 0C19 14.9 12 21 12 21Zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />;
export const ArrowRight = (p: P) => <Stroke {...p} d="M5 12h14m-6-6 6 6-6 6" />;
export const ArrowUpRight = (p: P) => <Stroke {...p} d="M7 17 17 7M8 7h9v9" />;
export const DownloadIcon = (p: P) => <Stroke {...p} d="M12 4v11m-5-5 5 5 5-5M5 20h14" />;
export const BookIcon = (p: P) => <Stroke {...p} d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5Zm0 14a2 2 0 0 1 2-2h13" />;
export const ChipIcon = (p: P) => <Stroke {...p} d="M8 8h8v8H8zM5 9H3m2 6H3m18-6h-2m2 6h-2M9 5V3m6 2V3M9 21v-2m6 2v-2M6 5h12a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />;
export const ShieldIcon = (p: P) => <Stroke {...p} d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6l-8-3Zm-3 9 2 2 4-4" />;
export const DroneIcon = (p: P) => <Stroke {...p} d="M5 5h3M16 5h3M6.5 5v3l3 2.5h5l3-2.5V5M9.5 10.5 8 15m6.5-4.5L16 15m-6 0h4" />;
export const RobotIcon = (p: P) => <Stroke {...p} d="M12 3v3M7 6h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Zm2 5h.01M15 11h.01M9.5 15h5M3 11v3m18-3v3" />;
export const UsersIcon = (p: P) => <Stroke {...p} d="M16 20v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1m7-9a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm13 9v-1a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" />;
export const LanguageIcon = (p: P) => <Stroke {...p} d="M4 5h8M8 3v2m2 0c-1 4-3.5 7-6 8.5M6 9c1 2 3 3.5 5 4.5M12 21l4.5-10 4.5 10m-7.5-3h6" />;
