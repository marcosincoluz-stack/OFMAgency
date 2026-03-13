import { defineMiddleware } from 'astro:middleware';

import {
  DEFAULT_LOCALE,
  detectLocaleFromAcceptLanguage,
  getLocaleFromPath,
  isLocale,
  resolveMarket,
  withLocale,
  type Locale,
  type Market,
} from '@/lib/i18n';

const ONE_YEAR = 60 * 60 * 24 * 365;
const ONE_WEEK = 60 * 60 * 24 * 7;

function isBypassPath(pathname: string) {
  if (pathname.startsWith('/_astro')) return true;
  if (pathname.startsWith('/favicon')) return true;
  if (pathname.startsWith('/images')) return true;
  if (pathname === '/rss.xml' || pathname === '/sitemap-index.xml') return true;
  if (/\.[a-zA-Z0-9]+$/.test(pathname)) return true;
  return false;
}

function getCanonicalFaviconPath(pathname: string) {
  const legacySegments = ['/dist/favicon/', '/public/favicon/'];
  for (const segment of legacySegments) {
    const matchIndex = pathname.indexOf(segment);
    if (matchIndex !== -1) {
      const suffix = pathname.slice(matchIndex + segment.length).replace(/^\/+/, '');
      return `/favicon/${suffix}`;
    }
  }
  return null;
}

function isMarket(value?: string | null): value is Market {
  return value === 'es' || value === 'latam' || value === 'global';
}

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, cookies } = context;
  const pathname = url.pathname;
  const isPrerendered = import.meta.env.SSR || (context.isPrerendered ?? false);

  // Legacy/stale asset paths observed in dev sessions.
  const canonicalFaviconPath = getCanonicalFaviconPath(pathname);
  if (canonicalFaviconPath) {
    return context.redirect(canonicalFaviconPath, 301);
  }

  const pathLocale = getLocaleFromPath(pathname);
  const cookieLocale = isPrerendered ? undefined : cookies.get('locale')?.value;
  const detectedLocale = detectLocaleFromAcceptLanguage(null);

  const resolvedLocale: Locale = isLocale(cookieLocale)
    ? cookieLocale
    : pathLocale || detectedLocale || DEFAULT_LOCALE;

  const marketOverrideQuery = url.searchParams.get('market');
  const marketOverrideCookie = isPrerendered ? undefined : cookies.get('market_override')?.value;

  let market: Market;
  if (isMarket(marketOverrideQuery)) {
    market = marketOverrideQuery;
    if (!isPrerendered) {
      cookies.set('market_override', marketOverrideQuery, {
        path: '/',
        maxAge: ONE_WEEK,
        sameSite: 'lax',
      });
    }
  } else if (isMarket(marketOverrideCookie)) {
    market = marketOverrideCookie;
  } else {
    market = resolveMarket(null);
  }

  context.locals.locale = pathLocale || resolvedLocale;
  context.locals.market = market;

  // In prerendered/static builds, avoid generating HTML redirect pages
  // (they show "Redirecting to /es" and add visual delay on first load).
  if (!isPrerendered && pathname === '/') {
    return context.redirect(`/${resolvedLocale}`, 302);
  }

  // Projects listing page was removed; send old links to localized home.
  if (!isPrerendered && (pathname === '/projects' || pathname === '/es/projects' || pathname === '/en/projects')) {
    return context.redirect(`/${resolvedLocale}`, 302);
  }

  // Legacy compatibility: non-prefixed routes always map to /es/*
  if (!isPrerendered && !pathLocale && !isBypassPath(pathname)) {
    return context.redirect(withLocale(pathname, DEFAULT_LOCALE), 302);
  }

  const response = await next();

  if (!isPrerendered && pathLocale && cookies.get('locale')?.value !== pathLocale) {
    cookies.set('locale', pathLocale, {
      path: '/',
      maxAge: ONE_YEAR,
      sameSite: 'lax',
    });
  }

  return response;
});
