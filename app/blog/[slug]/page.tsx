// https://www.js-craft.io/blog/example-of-using-the-generatestaticparams-in-nextjs-13-within-the-app-folder/
import { MDXRemote } from 'next-mdx-remote/rsc';
import { STORAGE_POSTS_URL } from '@/utils/constants';
import PostInterface from '@/utils/interfaces';
import Image from 'next/image'

async function fetchPosts() {
  const res = await fetch(`${STORAGE_POSTS_URL}_structure.json`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}


async function fetchPost(source: string) {
  const res = await fetch(source);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.text();
}

const ResponsiveImage = ({ src, alt }: { alt: string, src: string } = { alt: '', src: '' }) => {
  return (
    <Image src={src} alt={alt} sizes="100vw" style={{ width: '100%', height: 'auto' }} />
  );
}

const components = {
  img: ResponsiveImage,
}

async function MDXPost({ source }: { source: string }) {
  let markdown = await fetchPost(source)
  return (  // @ts-ignore
    <MDXRemote source={markdown} components={components} />
  )
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const postsData: { posts: Array<PostInterface> } = await fetchPosts();
  const post = postsData.posts.find(p => p.slug == params.slug);
  if (!post) {
    throw new Error('Failed to fetch page');
  }
  return (
    <section>
      <span className="text-xl">{post.title}</span>
      {/* @ts-expect-error */}
      <MDXPost source={`${STORAGE_POSTS_URL}${post.filename}`} />
    </section>
  );
}

export async function generateStaticParams() {
  const postsData: { posts: Array<PostInterface> } = await fetchPosts();
  return postsData.posts.map(p => ({slug: p.slug}));
}