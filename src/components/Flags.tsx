// Small round country flags as inline SVG (flag emoji don't render on Windows).
import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement> & { title?: string };

export function FlagBD({ title = "Bangladesh", ...p }: P) {
  return (
    <svg viewBox="0 0 40 40" role="img" aria-label={title} {...p}>
      <rect width="40" height="40" fill="#006a4e" />
      {/* Red disc sits slightly towards the hoist, as on the real flag. */}
      <circle cx="18" cy="20" r="10" fill="#f42a41" />
    </svg>
  );
}

export function FlagFR({ title = "France", ...p }: P) {
  return (
    <svg viewBox="0 0 40 40" role="img" aria-label={title} {...p}>
      <rect width="14" height="40" fill="#002654" />
      <rect x="13" width="14" height="40" fill="#ffffff" />
      <rect x="26" width="14" height="40" fill="#ce1126" />
    </svg>
  );
}

export function FlagES({ title = "Spain", ...p }: P) {
  return (
    <svg viewBox="0 0 40 40" role="img" aria-label={title} {...p}>
      <rect width="40" height="40" fill="#aa151b" />
      <rect y="10" width="40" height="20" fill="#f1bf00" />
    </svg>
  );
}
