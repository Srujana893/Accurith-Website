import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { featuredPost } from "@/components/blog/blogData";

// Featured split — full-height image left, editorial text right. Surfaces
// the blog's featured post (single source of truth: blogData.ts).
export default function FeaturedStory() {
  return (
    <section className="bg-sec1">
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
            Featured in our blog
          </p>
          <h2 className="mt-5 font-heading text-3xl font-extrabold leading-[1.05] tracking-tighter text-ink md:text-4xl">
            {featuredPost.title}
          </h2>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-ink-2">
            {featuredPost.excerpt}
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
  );
}
