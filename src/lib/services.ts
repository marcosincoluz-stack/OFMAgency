import { getCollection, getEntry } from 'astro:content';

import type {
  ProjectCategory,
  ProjectFrontmatter,
  ServiceFrontmatter,
} from '@/lib/types';

import {
  getProjectsByCategoryFrontmatter,
  getProjectsBySlugsFrontmatter,
} from './projects';

/**
 * Get all service slugs
 */
export async function getServiceSlugs(): Promise<string[]> {
  try {
    const services = await getCollection('services');
    return services.map((service) => service.id);
  } catch (error) {
    console.error('Error reading services directory:', error);
    return [];
  }
}

/**
 * Get service by slug
 */
export async function getServiceBySlug(slug: string) {
  try {
    const service = await getEntry('services', slug);
    if (!service) return null;

    return {
      slug: service.id,
      content: service.body,
      frontmatter: service.data as ServiceFrontmatter,
    };
  } catch (error) {
    console.error(`Error reading service ${slug}:`, error);
    return null;
  }
}

/**
 * Get all services with their frontmatter
 */
export async function getAllServices(): Promise<ServiceFrontmatter[]> {
  try {
    const services = await getCollection('services');

    // Convert collection entries to ServiceFrontmatter
    return services.map((service) => ({
      ...service.data,
    })) as ServiceFrontmatter[];
  } catch (error) {
    console.error('Error reading all services:', error);
    return [];
  }
}

/**
 * Resolve featured work for a service (without Logo components)
 * Use this when passing data to Client Components
 * - If featuredWork is undefined/empty: auto-filter by service slug (category)
 * - If featuredWork is string array: get projects by those slugs in specified order
 */
export async function resolveFeaturedWork(
  service: ServiceFrontmatter,
): Promise<ProjectFrontmatter[]> {
  const { slug, featuredWork } = service;

  // No featuredWork specified: auto-filter by category
  if (!featuredWork || featuredWork.length === 0) {
    return await getProjectsByCategoryFrontmatter(slug as ProjectCategory);
  }

  // Custom project selection by slugs
  return await getProjectsBySlugsFrontmatter(featuredWork);
}
