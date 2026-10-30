import type { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import IntroSection from '@/components/sections/IntroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import MethodSection from '@/components/sections/MethodSection';
import TechSection from '@/components/sections/TechSection';
import AboutSection from '@/components/sections/AboutSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import CtaSection from '@/components/sections/CtaSection';

export const metadata: Metadata = {
  title: 'Digitech Web — Agence Digitale Premium | Sites, Logiciels, Applications',
  description:
    'Digitech Web conçoit et développe des expériences numériques, des logiciels sur mesure et des identités digitales. Studio fondé par YEMBIT Saimon.',
  alternates: {
    canonical: 'https://www.digitechweb.online',
  },
};

/**
 * Page d'accueil — assemblage des sections.
 * Server Component : les sections client sont marquées 'use client'.
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <IntroSection />
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
