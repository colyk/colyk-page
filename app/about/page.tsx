import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'About',
};

export default function AboutPage() {
  return (
    <section>
      <h1>About</h1>
      <a
        href="/files/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
      >My resume</a>
    </section>
  );
}
