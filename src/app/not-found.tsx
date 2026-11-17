import Link from "next/link";
import { Container } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="py-28 text-center">
      <p className="text-sm font-semibold text-accent">404</p>
      <h1 className="mt-2 text-3xl font-bold text-fg">This page wandered off</h1>
      <p className="mt-3 text-fg-2">The page you are looking for doesn’t exist or has moved.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/" className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-fg hover:brightness-110">Go home</Link>
        <Link href="/projects/" className="rounded-full px-5 py-2.5 text-sm font-semibold text-fg ring-1 ring-line hover:text-accent">Projects</Link>
      </div>
    </Container>
  );
}
