/**
 * DIGITECH WEB — Données du site
 * Modifier ces constantes pour mettre à jour le contenu du site.
 */

import type { Service, Project, MethodStep, Technology, MotionVideo } from '@/types';

export const SITE_URL = 'https://www.digitechweb.online';

/* ============================================================
   INFORMATIONS DE CONTACT
   Modifier ces valeurs avec les vraies coordonnées.
   ============================================================ */
export const CONTACT = {
  email: 'digitechweb98@gmail.com',
  phone: '+212 770 742458',
  address: '',
  social: {
    linkedin: '',
    instagram: 'https://www.instagram.com/digitech_web1/',
    github: '',
  },
} as const;

/* ============================================================
   SERVICES
   ============================================================ */
export const SERVICES: Service[] = [
  {
    id: 'sites-web',
    number: '01',
    title: 'Conception de sites web',
    description:
      'Des sites modernes, rapides et immersifs qui donnent à votre marque une présence digitale à la hauteur de ses ambitions.',
    items: [
      'Design UX/UI',
      'Développement',
      'Sites vitrines',
      'Sites institutionnels',
      'Expériences interactives',
    ],
  },
  {
    id: 'logiciels',
    number: '02',
    title: 'Conception de logiciels',
    description:
      'Des logiciels sur mesure conçus pour répondre précisément aux besoins de votre entreprise.',
    items: [
      'Logiciels métiers',
      'Plateformes web',
      'SaaS',
      'Tableaux de bord',
      'Automatisation',
      'Outils internes',
      'Systèmes personnalisés',
    ],
  },
  {
    id: 'applications',
    number: '03',
    title: 'Applications web et mobiles',
    description:
      'Des applications pensées pour offrir des expériences intuitives, rapides et performantes.',
    items: [
      'Applications web',
      'Applications mobiles',
      'Interfaces utilisateur',
      'Expériences digitales',
    ],
  },
  {
    id: 'ecommerce',
    number: '04',
    title: 'E-commerce',
    description:
      'Des expériences commerciales digitales pensées pour convertir et accompagner la croissance de votre activité.',
    items: [
      'Boutiques en ligne',
      'Expérience client',
      'Paiement',
      'Catalogue',
      'Optimisation de conversion',
    ],
  },
  {
    id: 'branding',
    number: '05',
    title: 'Identité visuelle et branding',
    description:
      'Nous construisons des identités fortes capables de rendre votre marque immédiatement reconnaissable.',
    items: [
      'Identité visuelle',
      'Direction artistique',
      'Logo',
      'Système graphique',
      'Design system',
    ],
  },
  {
    id: 'strategie',
    number: '06',
    title: 'Stratégie digitale',
    description:
      'Nous transformons vos objectifs business en stratégies digitales concrètes.',
    items: [
      'Audit',
      'Positionnement',
      'Stratégie digitale',
      'Transformation numérique',
      'Accompagnement',
    ],
  },
  {
    id: 'referencement',
    number: '07',
    title: 'Référencement et visibilité',
    description:
      'Nous optimisons votre présence digitale afin d\'améliorer votre visibilité et d\'attirer les bonnes audiences.',
    items: [
      'SEO',
      'Performance',
      'Contenu',
      'Acquisition',
      'Optimisation',
    ],
  },
  {
    id: 'motion-design',
    number: '08',
    title: 'Motion design et vidéo',
    description:
      'Des vidéos captivantes et des animations fluides qui valorisent votre produit et captent immédiatement l\'attention.',
    items: [
      'Vidéos produits & démos',
      'Animations d\'interfaces',
      'Spots publicitaires & réseaux sociaux',
      'Format 9:16 mobile & 16:9 desktop',
      'Sound design & habillage sonore',
    ],
  },
];

/* ============================================================
   PROJETS / RÉALISATIONS
   Remplacer les placeholders par de vrais projets.
   ============================================================ */
export const MOTION_VIDEOS: MotionVideo[] = [
  {
    id: 'motion-01',
    title: 'MillionBuild',
    category: 'Motion design',
    slug: 'millionbuild',
    teaserMp4: '/videos/millionbuild-teaser.mp4',
    teaserWebm: '/videos/millionbuild-teaser.webm',
    fullMp4: '/videos/millionbuild-full.mp4',
    posterJpg: '/videos/millionbuild-poster.jpg',
    posterWebp: '/videos/millionbuild-poster.webp',
    posterAvif: '/videos/millionbuild-poster.avif',
    duration: 47,
    uploadDate: '2026-10-31',
    jsonLdDescription: 'Vidéo motion design présentant l\'application MillionBuild de commande de matériaux de construction.',
  },
  {
    id: 'motion-02',
    title: 'SAB Service',
    category: 'Motion design',
    slug: 'sab-service',
    teaserMp4: '/videos/sab-service-teaser.mp4',
    teaserWebm: '/videos/sab-service-teaser.webm',
    fullMp4: '/videos/sab-service-full.mp4',
    posterJpg: '/videos/sab-service-poster.jpg',
    posterWebp: '/videos/sab-service-poster.webp',
    posterAvif: '/videos/sab-service-poster.avif',
    duration: 59,
    uploadDate: '2026-10-31',
    jsonLdDescription: 'Vidéo motion design présentant SAB Service, accompagnement administratif pour étudiants et professionnels.',
  },
  {
    id: 'motion-03',
    title: 'Shopishap',
    category: 'Motion design',
    slug: 'shopishap',
    teaserMp4: '/videos/shopishap-teaser.mp4',
    teaserWebm: '/videos/shopishap-teaser.webm',
    fullMp4: '/videos/shopishap-full.mp4',
    posterJpg: '/videos/shopishap-poster.jpg',
    posterWebp: '/videos/shopishap-poster.webp',
    posterAvif: '/videos/shopishap-poster.avif',
    duration: 23,
    uploadDate: '2026-10-31',
    jsonLdDescription: 'Vidéo motion design présentant Shopishap, plateforme de création de boutiques en ligne.',
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'project-01',
    number: '01',
    title: 'SUSHI SENSATION',
    category: 'Site web',
    description:
      'Un site vitrine élégant pour un restaurant japonais, pensé pour donner envie et faciliter la réservation en ligne.',
    slug: 'sushi-sensation',
    video: '/videos/sushi-sensation.mp4',
    images: [
      '/images/sushi-sensation/sushi-01.png',
      '/images/sushi-sensation/sushi-02.png',
      '/images/sushi-sensation/sushi-03.png',
    ],
  },
  {
    id: 'project-02',
    number: '02',
    title: 'MBOLO SAMBA',
    category: 'Application',
    description:
      'Une marketplace intuitive qui connecte vendeurs et acheteurs, avec une expérience fluide de la découverte au paiement.',
    slug: 'mbolo-samba',
    video: '/videos/mbolo-samba.mp4',
    images: [
      '/images/mbolo-samba/mbolo-01.jpg',
      '/images/mbolo-samba/mbolo-03.jpg',
    ],
  },
  {
    id: 'project-03',
    number: '03',
    title: 'DIGIAUTOCARS',
    category: 'Logiciel',
    description:
      'Un logiciel de gestion sur mesure pour agences automobiles, du suivi de stock à la relation client.',
    slug: 'digiautocars',
    images: [
      '/images/digiautocars/digiautocars-01.jpg',
      '/images/digiautocars/digiautocars-02.jpg',
      '/images/digiautocars/digiautocars-03.jpg',
      '/images/digiautocars/digiautocars-04.png',
    ],
  },
  {
    id: 'project-04',
    number: '04',
    title: 'Dorcas Moïra — Portfolio mannequin',
    category: 'Site web',
    description:
      'Portfolio éditorial et immersif pour mannequin professionnel, pensé pour sublimer l\'image de marque et valoriser les collaborations de prestige.',
    slug: 'dorcas-moira',
    status: 'draft',
    images: [],
  },
];

/* ============================================================
   MÉTHODE — 4 étapes
   ============================================================ */
export const METHOD_STEPS: MethodStep[] = [
  {
    number: '01',
    title: 'Comprendre',
    description:
      'Nous commençons par comprendre votre activité, vos utilisateurs et vos objectifs.',
  },
  {
    number: '02',
    title: 'Concevoir',
    description:
      'Nous transformons la stratégie en une expérience claire, intuitive et mémorable.',
  },
  {
    number: '03',
    title: 'Construire',
    description:
      'Nous développons une solution performante, scalable et adaptée à votre environnement.',
  },
  {
    number: '04',
    title: 'Déployer',
    description:
      'Nous lançons le projet, analysons les résultats et continuons à l\'améliorer.',
  },
];

/* ============================================================
   TECHNOLOGIES
   ============================================================ */
export const TECHNOLOGIES: Technology[] = [
  { name: 'Next.js',       category: 'frontend' },
  { name: 'React',         category: 'frontend' },
  { name: 'TypeScript',    category: 'frontend' },
  { name: 'Node.js',       category: 'backend' },
  { name: 'Three.js',      category: 'frontend' },
  { name: 'React Native',  category: 'frontend' },
  { name: 'Tailwind CSS',  category: 'frontend' },
  { name: 'PostgreSQL',    category: 'backend' },
  { name: 'Supabase',      category: 'infra' },
  { name: 'Figma',         category: 'design' },
];

/* ============================================================
   NAVIGATION
   ============================================================ */
export const NAV_LINKS = [
  { label: 'Accueil',      href: '/' },
  { label: 'Services',     href: '/services' },
  { label: 'Réalisations', href: '/realisations' },
  { label: 'À propos',     href: '/a-propos' },
  { label: 'Blog',         href: '/blog' },
] as const;
