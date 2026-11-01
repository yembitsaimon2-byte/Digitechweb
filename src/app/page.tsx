import type { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import IntroSection from '@/components/sections/IntroSection';
import MotionSection from '@/components/sections/MotionSection';
import ServicesSection from '@/components/sections/ServicesSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import MethodSection from '@/components/sections/MethodSection';
import TechSection from '@/components/sections/TechSection';
import AboutSection from '@/components/sections/AboutSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import CtaSection from '@/components/sections/CtaSection';
import { SITE_URL } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Digitech Web — Agence Digitale Premium | Sites, Logiciels, Applications',
  description:
    'Digitech Web conçoit et développe des expériences numériques, des logiciels sur mesure et des identités digitales. Studio fondé par Yembit Saïmon.',
  alternates: {
    canonical: 'https://www.digitechweb.online',
  },
};

const videoObjectsLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'VideoObject',
      name: 'MillionBuild — Motion design',
      description: "Vidéo motion design présentant l'application MillionBuild de commande de matériaux de construction.",
      thumbnailUrl: `${SITE_URL}/videos/millionbuild-poster.jpg`,
      uploadDate: '2026-10-31T00:00:00+00:00',
      duration: 'PT47S',
      contentUrl: `${SITE_URL}/videos/millionbuild-full.mp4`,
    },
    {
      '@type': 'VideoObject',
      name: 'SAB Service — Motion design',
      description: 'Vidéo motion design présentant SAB Service, accompagnement administratif pour étudiants et professionnels.',
      thumbnailUrl: `${SITE_URL}/videos/sab-service-poster.jpg`,
      uploadDate: '2026-10-31T00:00:00+00:00',
      duration: 'PT59S',
      contentUrl: `${SITE_URL}/videos/sab-service-full.mp4`,
    },
    {
      '@type': 'VideoObject',
      name: 'Shopishap — Motion design',
      description: 'Vidéo motion design présentant Shopishap, plateforme de création de boutiques en ligne.',
      thumbnailUrl: `${SITE_URL}/videos/shopishap-poster.jpg`,
      uploadDate: '2026-10-31T00:00:00+00:00',
      duration: 'PT23S',
      contentUrl: `${SITE_URL}/videos/shopishap-full.mp4`,
    },
  ],
};

/**
 * Page d'accueil — assemblage des sections.
 * Server Component : les sections client sont marquées 'use client'.
 */
export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoObjectsLd) }}
      />
      <HeroSection />
      <IntroSection />
      <MotionSection />
      <ServicesSection />
      <ProjectsSection />
      <MethodSection />
      <TechSection />
      <AboutSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}
