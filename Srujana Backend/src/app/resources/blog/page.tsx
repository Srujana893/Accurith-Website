import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Badge from '@/components/ui/Badge';
import { getAllPosts } from '@/lib/blog';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'Resources & Blog',
  description: 'Plain-spoken writing on audit, security, and automation from the Accurith team.',
  path: '/resources/blog',
});

// Blog list — real posts from /content/blog via Srujana's MDX pipeline (S-track).
export default function BlogListPage() {
  const posts = getAllPosts();

  return (
    <>
      <Section tone="white" hairline={false} dotGrid className="md:py-28">
        <Container>
          <p className="mb-3 font-mono text-xs tracking-widest text-teal-700 uppercase">
            Resources
          </p>
          <h1 className="max-w-3xl text-4xl leading-tight tracking-tight md:text-5xl">
            Notes from the practice
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-700">
            Plain-spoken writing on audit, security, and automation — the things we explain to
            clients most often, written down once.
          </p>
        </Container>
      </Section>

      <Section tone="grey">
        <Container>
          {posts.length === 0 ? (
            <p className="text-slate-600">First posts are on their way.</p>
          ) : (
            <div className="grid gap-6 md:max-w-2xl">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/resources/blog/${post.slug}`}
                  className="group corner-ticks rounded-lg border border-slate-200 bg-white p-6 transition-all duration-200 ease-out hover:border-teal-300 hover:shadow-md"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    {post.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} mono>
                        {tag}
                      </Badge>
                    ))}
                    <span className="font-mono text-xs text-slate-500">
                      {post.date} · {post.author}
                    </span>
                  </div>
                  <h2 className="mt-4 text-2xl leading-tight group-hover:text-teal-700">
                    {post.title}
                  </h2>
                  <p className="mt-2 leading-relaxed text-slate-700">{post.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal-700">
                    Read the post
                    <ArrowRight aria-hidden="true" size={16} strokeWidth={1.75} />
                  </span>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
