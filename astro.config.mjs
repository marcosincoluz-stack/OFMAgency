// @ts-check
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

const LEGACY_FAVICON_SEGMENTS = ['/dist/favicon/', '/public/favicon/'];

function getCanonicalFaviconPath(urlPath) {
  for (const segment of LEGACY_FAVICON_SEGMENTS) {
    const matchIndex = urlPath.indexOf(segment);
    if (matchIndex !== -1) {
      const suffix = urlPath.slice(matchIndex + segment.length).replace(/^\/+/, '');
      return `/favicon/${suffix}`;
    }
  }
  return null;
}

const legacyFaviconRedirectPlugin = {
  name: 'legacy-favicon-redirect',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const rawUrl = req.url ?? '';
      const [urlPath, query = ''] = rawUrl.split('?');
      const canonicalPath = getCanonicalFaviconPath(urlPath);

      if (canonicalPath) {
        const redirectUrl = query ? `${canonicalPath}?${query}` : canonicalPath;
        res.statusCode = 302;
        res.setHeader('Location', redirectUrl);
        res.end();
        return;
      }

      next();
    });
  },
};

// https://astro.build/config
export default defineConfig({
  site: 'https://velour.agency',
  integrations: [mdx(), sitemap(), react()],
  devToolbar: {
    enabled: true,
  },

  vite: {
    plugins: [tailwindcss(), legacyFaviconRedirectPlugin],
    build: {
      // Use clean builds so static assets/chunks are not stale between builds.
      emptyOutDir: true,
    },
    server: {
      watch: {
        // Prevent dev HMR from reacting to build output churn in dist/
        ignored: ['**/dist/**'],
      },
    },
  },
});
