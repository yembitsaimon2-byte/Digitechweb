import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

export interface HeadingItem {
  id: string;
  text: string;
  level: number; // 2 or 3
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface BlogPostMeta {
  title: string;
  slug: string;
  description: string;
  date: string;
  updated?: string;
  author: string;
  category: 'Portrait' | 'Services' | 'Études de cas' | 'Conseils' | string;
  tags: string[];
  coverImage: string;
  coverAlt: string;
  status: 'draft' | 'published';
  readingTime: number; // minutes
}

export interface BlogPost extends BlogPostMeta {
  content: string;
  htmlContent: string;
  headings: HeadingItem[];
  faqs: FaqItem[];
}

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

/**
 * Nettoie une chaîne pour générer un slug URL-friendly et un ancrage HTML valide.
 */
export function slugify(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

/**
 * Calcule le temps de lecture en minutes (base 200 mots/min).
 */
export function calculateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

/**
 * Extrait les titres H2 et H3 du markdown brut pour le sommaire.
 */
export function extractHeadings(content: string): HeadingItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: HeadingItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const rawText = match[2].trim();
    // Enlever le markdown basique (gras, liens...) du texte du sommaire
    const cleanText = rawText
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/[*_`]/g, '');
    const id = slugify(cleanText);

    headings.push({ id, text: cleanText, level });
  }

  return headings;
}

/**
 * Extrait les questions et réponses de la section "## Questions fréquentes" pour JSON-LD.
 */
export function extractFaqs(content: string): FaqItem[] {
  const faqSectionRegex = /## Questions fréquentes([\s\S]*?)(?=\n## |\n#[^#]|$)/i;
  const match = content.match(faqSectionRegex);
  if (!match) return [];

  const sectionBody = match[1];
  const items: FaqItem[] = [];
  const parts = sectionBody.split(/\n### /).filter(Boolean);

  for (const part of parts) {
    const lines = part.trim().split('\n');
    const question = lines[0].replace(/[*_#]/g, '').trim();
    const answer = lines.slice(1).join(' ').trim().replace(/\s+/g, ' ');
    if (question && answer) {
      items.push({ question, answer });
    }
  }

  return items;
}

/**
 * Convertit le markdown brut en HTML enrichi avec IDs sur les H2 et H3.
 */
export function renderMarkdownToHtml(markdown: string): string {
  // Configurer un renderer personnalisé pour injecter les IDs slugifiés
  const renderer = new marked.Renderer();

  renderer.heading = ({ text, depth }: { text: string; depth: number }) => {
    const plainText = text.replace(/<[^>]*>/g, '').replace(/[*_`]/g, '');
    const id = slugify(plainText);
    return `<h${depth} id="${id}">${text}</h${depth}>\n`;
  };

  return marked.parse(markdown, { renderer, gfm: true, breaks: true }) as string;
}

/**
 * Récupère tous les articles de blog.
 * Par défaut en production, filtre les brouillons. En dev, les inclut pour prévisualisation.
 */
export function getAllPosts(includeDrafts = process.env.NODE_ENV !== 'production'): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx') || f.endsWith('.md'));

  const posts: BlogPostMeta[] = [];

  for (const file of files) {
    const fullPath = path.join(BLOG_DIR, file);
    const fileContent = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContent);

    const status = (data.status || 'draft') as 'draft' | 'published';
    if (!includeDrafts && status === 'draft') {
      continue;
    }

    const readingTime = calculateReadingTime(content);

    posts.push({
      title: data.title || '',
      slug: data.slug || file.replace(/\.mdx?$/, ''),
      description: data.description || '',
      date: data.date || '',
      updated: data.updated || data.date || '',
      author: data.author || 'Yembit Saïmon',
      category: data.category || 'Conseils',
      tags: Array.isArray(data.tags) ? data.tags : [],
      coverImage: data.coverImage || '/images/og-image.jpg',
      coverAlt: data.coverAlt || data.title || '',
      status,
      readingTime,
    });
  }

  // Trier par date décroissante
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Récupère un article par son slug.
 */
export function getPostBySlug(
  slug: string,
  includeDrafts = process.env.NODE_ENV !== 'production'
): BlogPost | null {
  if (!fs.existsSync(BLOG_DIR)) return null;

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx') || f.endsWith('.md'));

  for (const file of files) {
    const fullPath = path.join(BLOG_DIR, file);
    const fileContent = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContent);

    const postSlug = data.slug || file.replace(/\.mdx?$/, '');
    if (postSlug !== slug) continue;

    const status = (data.status || 'draft') as 'draft' | 'published';
    if (!includeDrafts && status === 'draft') {
      return null;
    }

    const readingTime = calculateReadingTime(content);
    const headings = extractHeadings(content);
    const faqs = extractFaqs(content);
    const htmlContent = renderMarkdownToHtml(content);

    return {
      title: data.title || '',
      slug: postSlug,
      description: data.description || '',
      date: data.date || '',
      updated: data.updated || data.date || '',
      author: data.author || 'Yembit Saïmon',
      category: data.category || 'Conseils',
      tags: Array.isArray(data.tags) ? data.tags : [],
      coverImage: data.coverImage || '/images/og-image.jpg',
      coverAlt: data.coverAlt || data.title || '',
      status,
      readingTime,
      content,
      htmlContent,
      headings,
      faqs,
    };
  }

  return null;
}

/**
 * Récupère les articles similaires / recommandés.
 */
export function getRelatedPosts(
  currentSlug: string,
  category: string,
  limit = 2,
  includeDrafts = process.env.NODE_ENV !== 'production'
): BlogPostMeta[] {
  const all = getAllPosts(includeDrafts);
  const filtered = all.filter((p) => p.slug !== currentSlug);
  const sameCategory = filtered.filter((p) => p.category === category);
  const others = filtered.filter((p) => p.category !== category);
  return [...sameCategory, ...others].slice(0, limit);
}
