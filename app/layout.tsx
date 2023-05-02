import './global.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google'
import Sidebar from '../components/sidebar';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mykola Yurchenko',
  description: 'Test',
};

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html
      lang="en"
      className={inter.className}
    >
      <body className="antialiased max-w-4xl mb-40 flex flex-col md:flex-row mx-4 mt-8 md:mt-20 lg:mt-32 lg:mx-auto">
        <main className="order-2 md:order-none mt-6 md:mt-0 flex flex-col px-2 md:px-0 w-full">
          {children}
        </main>
        <Sidebar />
      </body>
    </html>
  );
}
