import { redirect } from 'next/navigation';

// /resources currently holds only the blog — canonical list lives at
// /resources/blog (the path the sitemap and Srujana's pipeline use).
export default function ResourcesPage() {
  redirect('/resources/blog');
}
