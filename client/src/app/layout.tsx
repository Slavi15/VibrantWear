import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import { jost } from '@/styles/fonts';

const Providers = dynamic(() => import("@/components/Providers.tsx"));
const Navbar = dynamic(() => import("@/components/Navbar.tsx"));
const Footer = dynamic(() => import("@/components/Footer.tsx"));
const CookieBanner = dynamic(() => import("@/components/elements/CookieBanner.tsx"));

import './globals.scss';

export const metadata: Metadata = {
  title: 'VibrantWear',
  description: 'Print-on-demand Ecommerce Website, Organic Cotton Materials',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={jost.className}>
        <Providers>
          <Navbar />
          {children}
          <Footer />
          <CookieBanner />
        </Providers>
      </body>
    </html>
  );
};