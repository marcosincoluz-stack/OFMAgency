import { getCollection, type CollectionEntry } from 'astro:content';

import { DEFAULT_LOCALE, type Locale } from '@/lib/i18n';

export type BlogPostEntry = CollectionEntry<'blog'>;

function parseDate(value: string | Date) {
  return value instanceof Date ? value : new Date(value);
}

export async function getAllBlogPosts(
  locale: Locale = DEFAULT_LOCALE,
): Promise<BlogPostEntry[]> {
  const posts = await getCollection('blog');

  const localePosts = posts.filter(
    (post) =>
      post.data.locale === locale ||
      (!post.data.locale && locale === DEFAULT_LOCALE),
  );

  const fallbackPosts =
    locale === DEFAULT_LOCALE
      ? localePosts
      : posts.filter((post) => post.data.locale === DEFAULT_LOCALE || !post.data.locale);

  const resolvedPosts = localePosts.length > 0 ? localePosts : fallbackPosts;

  return resolvedPosts.sort(
    (a, b) => parseDate(b.data.date).getTime() - parseDate(a.data.date).getTime(),
  );
}

export async function getBlogPostBySlug(
  locale: Locale = DEFAULT_LOCALE,
  slug: string,
): Promise<BlogPostEntry | null> {
  const posts = await getCollection('blog');

  const localePost =
    posts.find((post) => post.id === slug && post.data.locale === locale) ||
    (locale === DEFAULT_LOCALE
      ? posts.find((post) => post.id === slug && !post.data.locale)
      : undefined);

  if (localePost) return localePost;

  const fallbackPost =
    posts.find((post) => post.id === slug && post.data.locale === DEFAULT_LOCALE) ||
    posts.find((post) => post.id === slug && !post.data.locale);

  return fallbackPost ?? null;
}

export async function getAllBlogSlugs(): Promise<string[]> {
  const posts = await getCollection('blog');
  return Array.from(new Set(posts.map((post) => post.id)));
}

