import { getCollection, getEntry } from 'astro:content';

import {
  Logo1,
  Logo2,
  Logo3,
  Logo4,
  Logo5,
  Logo6,
  Logo7,
  Logo8,
  Logo9,
} from '@/components/icons/logos';
import { DEFAULT_LOCALE, type Locale } from '@/lib/i18n';
import type {
  EnrichedProject,
  ProjectCategory,
  ProjectFrontmatter,
} from '@/lib/types';

const LOGO_MAP = {
  Logo1,
  Logo2,
  Logo3,
  Logo4,
  Logo5,
  Logo6,
  Logo7,
  Logo8,
  Logo9,
} as const;

type ProjectCollection = 'projectsEs' | 'projectsEn';

const PROJECT_COLLECTION_BY_LOCALE: Record<Locale, ProjectCollection> = {
  es: 'projectsEs',
  en: 'projectsEn',
};

function getProjectCollection(locale: Locale): ProjectCollection {
  return PROJECT_COLLECTION_BY_LOCALE[locale] ?? PROJECT_COLLECTION_BY_LOCALE[DEFAULT_LOCALE];
}

export async function getProjectSlugs(
  locale: Locale = DEFAULT_LOCALE,
): Promise<string[]> {
  try {
    const projects = await getCollection(getProjectCollection(locale));
    return projects.map((project) => project.id);
  } catch (error) {
    console.error('Error reading projects directory:', error);
    return [];
  }
}

export async function getProjectBySlug(
  locale: Locale = DEFAULT_LOCALE,
  slug: string,
) {
  try {
    const project = await getEntry(getProjectCollection(locale), slug);
    if (!project) return null;

    return {
      slug: project.id,
      content: project.body,
      frontmatter: project.data as ProjectFrontmatter,
    };
  } catch (error) {
    console.error(`Error reading project ${slug}:`, error);
    return null;
  }
}

export async function getAllProjects(
  locale: Locale = DEFAULT_LOCALE,
): Promise<ProjectFrontmatter[]> {
  try {
    const projects = await getCollection(getProjectCollection(locale));

    const projectData = projects.map((project) => ({
      ...project.data,
    })) as ProjectFrontmatter[];

    return projectData.sort((a, b) => parseInt(a.id) - parseInt(b.id));
  } catch (error) {
    console.error('Error reading all projects:', error);
    return [];
  }
}

export async function getAllProjectsWithLogos(
  locale: Locale = DEFAULT_LOCALE,
): Promise<EnrichedProject[]> {
  try {
    const projects = await getAllProjects(locale);

    return projects.map((frontmatter) => {
      const Logo = LOGO_MAP[frontmatter.logo as keyof typeof LOGO_MAP];

      return {
        ...frontmatter,
        Logo,
      } as EnrichedProject;
    });
  } catch (error) {
    console.error('Error enriching projects with logos:', error);
    return [];
  }
}

export async function getProjectsByCategory(
  locale: Locale = DEFAULT_LOCALE,
  category: ProjectCategory,
): Promise<EnrichedProject[]> {
  const allProjects = await getAllProjectsWithLogos(locale);
  return allProjects.filter((project) => project.category === category);
}

export async function getProjectsBySlugs(
  locale: Locale = DEFAULT_LOCALE,
  slugs: string[],
): Promise<EnrichedProject[]> {
  const allProjects = await getAllProjectsWithLogos(locale);
  const projectMap = new Map(allProjects.map((p) => [p.slug, p]));

  return slugs
    .map((slug) => projectMap.get(slug))
    .filter((project): project is EnrichedProject => project !== undefined);
}

export async function getProjectsByCategoryFrontmatter(
  locale: Locale = DEFAULT_LOCALE,
  category: ProjectCategory,
): Promise<ProjectFrontmatter[]> {
  const allProjects = await getAllProjects(locale);
  return allProjects.filter((project) => project.category === category);
}

export async function getProjectsBySlugsFrontmatter(
  locale: Locale = DEFAULT_LOCALE,
  slugs: string[],
): Promise<ProjectFrontmatter[]> {
  const allProjects = await getAllProjects(locale);
  const projectMap = new Map(allProjects.map((p) => [p.slug, p]));

  return slugs
    .map((slug) => projectMap.get(slug))
    .filter((project): project is ProjectFrontmatter => project !== undefined);
}
