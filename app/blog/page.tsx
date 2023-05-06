import type { Metadata } from 'next';
import Link from 'next/link';
import PostInterface from '@/utils/interfaces';
import { REVALIDATE_CACHE, STORAGE_POSTS_URL } from '@/utils/constants';
import { format, fromUnixTime } from 'date-fns'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Blog',
};

async function fetchPosts() {
  const res = await fetch(`${STORAGE_POSTS_URL}_structure.json`, { next: { revalidate: REVALIDATE_CACHE } });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}


function Post({ post }: { post: PostInterface }) {
  console.log(post)
  return (
    <article className='my-2 flex flex-col'>
      <h2 className="text-lg md:text-xl font-semibold hover:underline">
        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
      </h2>
      <section className="text-xs md:text-sm font-medium text-slate-400 dark:text-slate-600">
        <time className='text-slate-400'>{format(fromUnixTime(post.timestamp), 'MM-dd-yyyy')}</time>
      </section>
    </article>
  )
}

export default async function BlogPage() {
  const postsData = await fetchPosts();
  return (
    <section>
      <p className='font-bold'>Blog page</p>
      <section className='flex flex-col mt-4'>
        {
          postsData['posts'].map((post: PostInterface) => (
            <Post key={post.id} post={post} />
          ))
        }
      </section>
    </section>
  );
}
