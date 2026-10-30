import type { Metadata } from 'next';
import { PROJECTS } from '@/lib/data';
import { notFound } from 'next/navigation';
import CaseStudyView from '@/components/sections/CaseStudyView';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROJECTS.filter((p) => p.video || (p.images && p.images.length > 0)).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return { title: 'Projet introuvable | Digitech Web' };
  }

  return {
    title: `${project.title} — Case Study | Digitech Web`,
    description: project.description,
    alternates: { canonical: `https://www.digitechweb.online/realisations/${slug}` },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = PROJECTS.find(
    (p) => p.slug === slug && (p.video || (p.images && p.images.length > 0))
  );

  if (!project) notFound();

  return <CaseStudyView project={project} />;
}

