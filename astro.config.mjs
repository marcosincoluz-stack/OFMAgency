// @ts-check
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://hive-astro-template.vercel.app',
  integrations: [mdx(), sitemap(), react()],
  devToolbar: {
    enabled: true,
  },

  vite: {
    plugins: [tailwindcss()],
    build: {
      // Keep dist files during rebuilds to avoid transient ENOENT from parallel dev/build reads.
      emptyOutDir: false,
    },
    server: {
      watch: {
        // Prevent dev HMR from reacting to build output churn in dist/
        ignored: ['**/dist/**'],
      },
    },
  },
});
