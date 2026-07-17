import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import Container from "./ui/Container";

// Signature element 2 — thin teal-tinted band on every page, above the footer.
// The Trust page expands this into the full list.
export default function TransparencyBand() {
  return (
    <aside className="border-t border-teal-200 bg-teal-50">
      <Container className="flex flex-col items-start gap-2 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-start gap-2 text-sm text-teal-900 sm:items-center">
          <ShieldCheck
            aria-hidden="true"
            size={24}
            strokeWidth={1.75}
            className="mt-0.5 shrink-0 text-teal-700 sm:mt-0"
          />
          <span>
            This site is built to the standards we advise — A+ security headers
            · privacy-first analytics · minimal third-party code
          </span>
        </p>
        <Link
          href="/trust"
          className="rounded-lg py-1 text-sm font-medium text-teal-800 underline-offset-4 hover:underline"
        >
          How we hold ourselves to it →
        </Link>
      </Container>
    </aside>
  );
}
