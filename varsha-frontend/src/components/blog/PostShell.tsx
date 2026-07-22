import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { BlogPost } from "./blogData";

// Direction B article layout — kicker + display title over a measured prose
// column. Wraps every post page; when the MDX pipeline (S-track) lands, its
// rendered output drops into `children` unchanged.
export default function PostShell({
  post,
  children,
}: {
  post: BlogPost;
  children: React.ReactNode;
}) {
  return (
    <article className="bg-white">
      <div className="mx-auto max-w-content px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-3xl">
          <p className="mb-10">
            <Link
              href="/blog"
              className="inline-flex min-h-11 items-center gap-2 rounded-lg font-mono text-xs uppercase tracking-kicker text-ink-3 transition-colors duration-200 hover:text-accent"
            >
              <ArrowLeft aria-hidden="true" size={14} strokeWidth={2} />
              All posts
            </Link>
          </p>

          <p className="font-mono text-xs uppercase tracking-kicker text-accent">
            {post.category}
          </p>
          <h1 className="mt-5 font-heading text-3xl font-extrabold leading-[1.05] tracking-tighter text-ink md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-6 font-mono text-xs uppercase tracking-kicker text-ink-3">
            {post.date} · {post.readTime}
          </p>

          <div className="mt-12 space-y-6 border-t border-line-light pt-12 text-[17px] leading-relaxed text-ink-2 [&_h2]:pt-6 [&_h2]:font-heading [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tighter [&_h2]:text-ink [&_strong]:font-semibold [&_strong]:text-ink">
            {children}
          </div>

          {/* Post-level CTA — same conversion path as everywhere else. */}
          <div className="mt-16 border-t border-line-light pt-10">
            <p className="text-[15px] text-ink-3">
              Working through this in your own organisation?
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex min-h-11 items-center gap-3.5 rounded-lg"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-accent text-white">
                <ArrowRight aria-hidden="true" size={16} strokeWidth={2} />
              </span>
              <span className="font-mono text-[13px] uppercase tracking-kicker text-ink">
                Book a consultation
              </span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
