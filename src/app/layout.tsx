import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '../contexts/providers';
import { Noto_Sans } from 'next/font/google';

const noto = Noto_Sans({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Share The Journey',
  description: '나만의 여행지를 공유하고, 다른 사람들의 여행지를 찾아보세요.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`container mx-auto bg-white px-4 ${noto.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
