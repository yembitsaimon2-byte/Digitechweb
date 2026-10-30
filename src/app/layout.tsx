import type { Metadata, Viewport } from 'next';
import { Syne, Inter } from 'next/font/google';
import './globals.css';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Providers from '@/components/layout/Providers';
import CustomCursor from '@/components/ui/CustomCursor';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

/* ============================================================
   FONTS — auto-hébergées via next/font (zero CLS)
   ============================================================ */
const syne = Syne({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-syne',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

/* ============================================================
   METADATA
   ============================================================ */
export const metadata: Metadata = {
  metadataBase: new URL('https://digitech-web.fr'),
  title: {
    default: 'Digitech Web — Agence Digitale Premium',
    template: '%s | Digitech Web',
  },
  description:
    'Digitech Web conçoit et développe des sites web, logiciels, applications et identités digitales pour des marques ambitieuses. Studio digital fondé par YEMBIT Saimon.',
  keywords: [
    'agence digitale',
    'conception site web',
    'développement logiciel',
    'application mobile',
    'identité visuelle',
    'branding',
    'stratégie digitale',
    'SEO',
    'YEMBIT Saimon',
    'Digitech Web',
  ],
  authors: [{ name: 'YEMBIT Saimon', url: 'https://digitech-web.fr' }],
  creator: 'Digitech Web',
  publisher: 'Digitech Web',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://digitech-web.fr',
    siteName: 'Digitech Web',
    title: 'Digitech Web — Agence Digitale Premium',
    description:
      'Nous concevons des expériences numériques, des logiciels et des identités digitales qui transforment les idées ambitieuses en projets concrets.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Digitech Web — Agence Digitale',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digitech Web — Agence Digitale Premium',
    description:
      'Nous concevons des expériences numériques, des logiciels et des identités digitales qui transforment les idées ambitieuses en projets concrets.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://digitech-web.fr',
  },
};

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

/* ============================================================
   ROOT LAYOUT
   ============================================================ */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${syne.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Structured Data — Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Digitech Web',
              url: 'https://digitech-web.fr',
              description:
                'Agence digitale spécialisée dans la conception de sites web, logiciels, applications mobiles et identités digitales.',
              founder: {
                '@type': 'Person',
                name: 'YEMBIT Saimon',
              },
              sameAs: [],
            }),
          }}
        />
      </head>
      <body className="noise-overlay">
        <Providers>
          <CustomCursor />
          <Navbar />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
