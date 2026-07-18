import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Badge from '@/components/ui/Badge';
import { getAllSlugs, getPostBySlug } from '@/lib/blog';
import { createMetadata } from '@/lib/metadata';

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return createMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/resources/blog/${slug}`,
  });
}

// Blog post layout — source comes from Srujana's MDX pipeline (getPostBySlug),
// rendered server-side via next-mdx-remote/rsc. Prose styling is hand-rolled
// (no typography plugin) to stay on the design tokens.
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <Section tone="white" hairline={false} className="md:py-24">
      <Container className="max-w-2xl">
        <p className="mb-6">
          <Link
            href="/resources/blog"
            className="inline-flex min-h-11 items-center rounded-lg font-mono text-xs tracking-widest text-teal-700 uppercase hover:underline"
          >
            ← Resources
          </Link>
        </p>
        <div className="flex flex-wrap items-center gap-2">
          {post.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} mono>
              {tag}
            </Badge>
          ))}
          <span className="font-mono text-xs text-slate-500">
            {post.date} · {post.author}
          </span>
        </div>
        <h1 className="mt-4 text-4xl leading-tight tracking-tight md:text-5xl">{post.title}</h1>

        <div className="[&_h2]:text-navy [&_h3]:text-navy mt-10 space-y-6 text-lg leading-relaxed text-slate-700 [&_a]:font-medium [&_a]:text-teal-700 [&_a]:underline-offset-4 hover:[&_a]:underline [&_code]:rounded [&_code]:bg-slate-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-base [&_h2]:pt-4 [&_h2]:text-2xl [&_h3]:pt-2 [&_h3]:text-xl [&_li]:ml-6 [&_ol]:list-decimal [&_ul]:list-disc">
          <MDXRemote source={post.source} />
        </div>
      </Container>
    </Section>
  );
}
