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

function isMarket(value?: string | null): value is Market {
  return value === 'es' || value === 'latam' || value === 'global';
}

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, request, cookies } = context;
  const pathname = url.pathname;
  const isPrerendered = context.isPrerendered ?? false;

  const pathLocale = getLocaleFromPath(pathname);
  const cookieLocale = cookies.get('locale')?.value;
  const acceptLanguage = isPrerendered
    ? null
    : request.headers.get('accept-language');
  const detectedLocale = detectLocaleFromAcceptLanguage(
    acceptLanguage,
  );

  const resolvedLocale: Locale = isLocale(cookieLocale)
    ? cookieLocale
    : pathLocale || detectedLocale || DEFAULT_LOCALE;

  const marketOverrideQuery = url.searchParams.get('market');
  const marketOverrideCookie = cookies.get('market_override')?.value;

  let market: Market;
  if (isMarket(marketOverrideQuery)) {
    market = marketOverrideQuery;
    cookies.set('market_override', marketOverrideQuery, {
      path: '/',
      maxAge: ONE_WEEK,
      sameSite: 'lax',
    });
  } else if (isMarket(marketOverrideCookie)) {
    market = marketOverrideCookie;
  } else {
    const countryCode = isPrerendered
      ? null
      : request.headers.get('x-vercel-ip-country');
    market = resolveMarket(countryCode);
  }

  context.locals.locale = pathLocale || resolvedLocale;
  context.locals.market = market;

  if (pathname === '/') {
    return context.redirect(`/${resolvedLocale}`, 302);
  }

  // Legacy compatibility: non-prefixed routes always map to /es/*
  if (!pathLocale && !isBypassPath(pathname)) {
    return context.redirect(withLocale(pathname, DEFAULT_LOCALE), 302);
  }

  const response = await next();

  if (pathLocale && cookies.get('locale')?.value !== pathLocale) {
    cookies.set('locale', pathLocale, {
      path: '/',
      maxAge: ONE_YEAR,
      sameSite: 'lax',
    });
  }

  return response;
});
