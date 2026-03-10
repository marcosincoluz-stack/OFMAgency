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
import type {
  EnrichedProject,
  ProjectCategory,
  ProjectFrontmatter,
} from '@/lib/types';

// Logo component mapping
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

/**
 * Get all project slugs
 */
export async function getProjectSlugs(): Promise<string[]> {
  try {
    const projects = await getCollection('projects');
    return projects.map((project) => project.id);
  } catch (error) {
    console.error('Error reading projects directory:', error);
    return [];
  }
}

/**
 * Get project by slug
 */
export async function getProjectBySlug(slug: string) {
  try {
    const project = await getEntry('projects', slug);
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

/**
 * Get all projects with their frontmatter only (without Logo components)
 * Use this when passing data to Client Components
 */
export async function getAllProjects(): Promise<ProjectFrontmatter[]> {
  try {
    const projects = await getCollection('projects');

    // Convert collection entries to ProjectFrontmatter
    const projectData = projects.map((project) => ({
      ...project.data,
    })) as ProjectFrontmatter[];

    // Sort by id
    return projectData.sort((a, b) => parseInt(a.id) - parseInt(b.id));
  } catch (error) {
    console.error('Error reading all projects:', error);
    return [];
  }
}

/**
 * Get all projects with their frontmatter and Logo components
 * Use this only in Server Components when you need the Logo component
 */
export async function getAllProjectsWithLogos(): Promise<EnrichedProject[]> {
  try {
    const projects = await getAllProjects();

    return projects.map((frontmatter) => {
      // Map logo string to Logo component
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

/**
 * Get projects filtered by category
 */
export async function getProjectsByCategory(
  category: ProjectCategory,
): Promise<EnrichedProject[]> {
  const allProjects = await getAllProjectsWithLogos();
  return allProjects.filter((project) => project.category === category);
}

/**
 * Get projects by slugs in specified order
 * Used when service MDX specifies custom featured work
 */
export async function getProjectsBySlugs(
  slugs: string[],
): Promise<EnrichedProject[]> {
  const allProjects = await getAllProjectsWithLogos();
  const projectMap = new Map(allProjects.map((p) => [p.slug, p]));

  // Return projects in the order specified by slugs array
  return slugs
    .map((slug) => projectMap.get(slug))
    .filter((project): project is EnrichedProject => project !== undefined);
}

/**
 * Get projects filtered by category (without Logo components)
 * Use this when passing data to Client Components
 */
export async function getProjectsByCategoryFrontmatter(
  category: ProjectCategory,
): Promise<ProjectFrontmatter[]> {
  const allProjects = await getAllProjects();
  return allProjects.filter((project) => project.category === category);
}

/**
 * Get projects by slugs in specified order (without Logo components)
 * Use this when passing data to Client Components
 */
export async function getProjectsBySlugsFrontmatter(
  slugs: string[],
): Promise<ProjectFrontmatter[]> {
  const allProjects = await getAllProjects();
  const projectMap = new Map(allProjects.map((p) => [p.slug, p]));

  // Return projects in the order specified by slugs array
  return slugs
    .map((slug) => projectMap.get(slug))
    .filter((project): project is ProjectFrontmatter => project !== undefined);
}
