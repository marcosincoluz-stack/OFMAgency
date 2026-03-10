import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    date: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    author: z.object({
      name: z.string(),
      image: z.string(),
      facebookUrl: z.string().optional(),
      twitterUrl: z.string().optional(),
      linkedinUrl: z.string().optional(),
    }),
    tags: z.array(z.string()).optional(),
    coverImage: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
    logo: z.string(),
    logoImage: z.string().optional(),
    category: z.enum(['logo-design', 'brand-identity', 'icon-design']),
    url: z.string(),
    title: z.string().optional(),
    description: z.string().optional(),
    date: z.string().optional(),
    industry: z.string().optional(),
    hideLogoOverlay: z.boolean().optional(),
    images: z.array(
      z.object({
        src: z.string(),
        alt: z.string(),
        title: z.string().optional(),
        description: z.string().optional(),
      })
    ),
    process: z
      .array(
        z.object({
          title: z.string(),
          description: z.string(),
          image: z.string().optional(),
        })
      )
      .optional(),
    // Custom styling fields
    logoClassName: z.string().optional(),
    wrapperClassName: z.string().optional(),
    imageClassName: z.string().optional(),
  }),
});

const services = defineCollection({
  loader: glob({ base: './src/content/services', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    pageTitle: z.string(),
    description: z.string(),
    slug: z.string(),
    heroImage: z.string(),
    image: z.string(),
    icon: z.string(),
    shortDescription: z.string(),
    tags: z.array(z.string()),
    featuredWork: z.array(z.string()).optional(),
    whatYouGet: z.array(
      z.object({
        icon: z.string(),
        title: z.string(),
        description: z.string(),
        image: z.string().optional(),
      })
    ),
    process: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
        image: z.string().optional(),
      })
    ),
  }),
});

export const collections = { blog, projects, services };
