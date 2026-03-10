import { getCollection, getEntry } from 'astro:content';

import { DEFAULT_LOCALE, type Locale } from '@/lib/i18n';
import type {
  ProjectCategory,
  ProjectFrontmatter,
  ServiceFrontmatter,
} from '@/lib/types';

import {
  getProjectsByCategoryFrontmatter,
  getProjectsBySlugsFrontmatter,
} from './projects';

type ServiceCollection = 'servicesEs' | 'servicesEn';

const SERVICE_COLLECTION_BY_LOCALE: Record<Locale, ServiceCollection> = {
  es: 'servicesEs',
  en: 'servicesEn',
};

function getServiceCollection(locale: Locale): ServiceCollection {
  return SERVICE_COLLECTION_BY_LOCALE[locale] ?? SERVICE_COLLECTION_BY_LOCALE[DEFAULT_LOCALE];
}

export async function getServiceSlugs(
  locale: Locale = DEFAULT_LOCALE,
): Promise<string[]> {
  try {
    const services = await getCollection(getServiceCollection(locale));
    return services.map((service) => service.id);
  } catch (error) {
    console.error('Error reading services directory:', error);
    return [];
  }
}

export async function getServiceBySlug(
  locale: Locale = DEFAULT_LOCALE,
  slug: string,
) {
  try {
    const service = await getEntry(getServiceCollection(locale), slug);
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

export async function getAllServices(
  locale: Locale = DEFAULT_LOCALE,
): Promise<ServiceFrontmatter[]> {
  try {
    const services = await getCollection(getServiceCollection(locale));

    return services.map((service) => ({
      ...service.data,
    })) as ServiceFrontmatter[];
  } catch (error) {
    console.error('Error reading all services:', error);
    return [];
  }
}

export async function resolveFeaturedWork(
  locale: Locale = DEFAULT_LOCALE,
  service: ServiceFrontmatter,
): Promise<ProjectFrontmatter[]> {
  const { slug, featuredWork } = service;

  if (!featuredWork || featuredWork.length === 0) {
    return await getProjectsByCategoryFrontmatter(locale, slug as ProjectCategory);
  }

  return await getProjectsBySlugsFrontmatter(locale, featuredWork);
}
