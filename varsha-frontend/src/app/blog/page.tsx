import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { featuredPost, regularPosts } from "@/components/blog/blogData";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Plain-spoken writing on audit, security, and automation from the Accurith team.",
};

// Blog index — Direction B. Page header, then the featured post as the same
// editorial split used on the home page (image left, kicker + display title
// right), then the remaining posts as hairline-ruled rows.
export default function BlogPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-white">
        <div className="mx-auto max-w-content px-6 pb-16 pt-16 md:px-12 md:pb-20 md:pt-24">
          <p className="font-mono text-xs uppercase tracking-kicker text-accent">
            Blog
          </p>
          <h1 className="mt-5 max-w-3xl font-heading text-4xl font-extrabold leading-[1.05] tracking-tighter text-ink md:text-5xl">
            Notes from the practice
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-ink-2">
            Plain-spoken writing on audit, security, and automation — the
            things we explain to clients most often, written down once.
          </p>
        </div>
      </section>

      {/* Featured post — editorial split, mirrors the home FeaturedStory. */}
      <section aria-labelledby="featured-post-heading" className="bg-sec1">
        <div className="mx-auto grid max-w-content items-stretch md:grid-cols-2">
          <div className="relative min-h-80 md:min-h-[32.5rem]">
            {featuredPost.image && (
              <Image
                src={featuredPost.image}
                alt={featuredPost.imageAlt ?? ""}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            )}
          </div>
          <div className="flex flex-col justify-center px-6 py-16 md:px-16 md:py-24">
            <p className="font-mono text-xs uppercase tracking-kicker text-accent">
              Featured
            </p>
            <h2
              id="featured-post-heading"
              className="mt-5 font-heading text-3xl font-extrabold leading-[1.05] tracking-tighter text-ink md:text-4xl"
            >
              {featuredPost.title}
            </h2>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-ink-2">
              {featuredPost.excerpt}
            </p>
            <p className="mt-6 font-mono text-xs uppercase tracking-kicker text-ink-3">
              {featuredPost.date} · {featuredPost.readTime}
            </p>
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="mt-8 inline-flex min-h-11 items-center gap-3.5 self-start rounded-lg"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-accent text-white">
                <ArrowRight aria-hidden="true" size={16} strokeWidth={2} />
              </span>
              <span className="font-mono text-[13px] uppercase tracking-kicker text-ink">
                Read the analysis
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* All other posts — hairline rows, same idiom as the expertise list. */}
      <section aria-labelledby="all-posts-heading" className="bg-white">
        <div className="mx-auto max-w-content px-6 py-20 md:px-12 md:py-24">
          <p
            id="all-posts-heading"
            className="mb-10 font-mono text-xs uppercase tracking-kicker text-accent"
          >
            All posts
          </p>
          <ul>
            {regularPosts.map((post) => (
              <li key={post.slug} className="border-t border-line-light">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col gap-3 py-8 transition-[padding] duration-200 motion-safe:hover:pl-3 md:flex-row md:items-baseline md:justify-between md:gap-10"
                >
                  <span className="flex flex-col gap-3 md:max-w-2xl">
                    <span className="font-mono text-xs uppercase tracking-kicker text-ink-3">
                      {post.category} · {post.date} · {post.readTime}
                    </span>
                    <span className="font-heading text-2xl font-bold tracking-tighter text-ink group-hover:text-accent md:text-3xl">
                      {post.title}
                    </span>
                    <span className="text-[15px] leading-relaxed text-ink-3">
                      {post.excerpt}
                    </span>
                  </span>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-line-light text-ink transition-colors duration-200 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                    <ArrowRight aria-hidden="true" size={16} strokeWidth={2} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="border-t border-line-light" />
          <p className="mt-10 max-w-2xl text-sm leading-relaxed text-ink-3">
            We publish when we have something worth saying — new analysis
            lands here first. Questions about anything we&apos;ve written?{" "}
            <Link
              href="/contact"
              className="text-accent underline-offset-4 hover:underline"
            >
              Talk to us
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
