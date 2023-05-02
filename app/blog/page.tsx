import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Blog',
};

export default async function BlogPage() {
  return (
    <section>
      Blog
    </section>
  );
}
