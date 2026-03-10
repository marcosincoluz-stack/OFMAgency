export const SUPPORTED_LOCALES = ['es', 'en'] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];
export type Market = 'es' | 'latam' | 'global';

export const DEFAULT_LOCALE: Locale = 'es';

const LATAM_COUNTRIES = new Set([
  'MX',
  'AR',
  'CO',
  'CL',
  'PE',
  'UY',
  'EC',
  'VE',
  'DO',
  'GT',
  'CR',
  'PA',
  'BO',
  'PY',
  'SV',
  'HN',
  'NI',
]);

export function isLocale(value?: string): value is Locale {
  if (!value) return false;
  return SUPPORTED_LOCALES.includes(value as Locale);
}

export function getLocaleFromPath(pathname: string): Locale | null {
  const segment = pathname.split('/').filter(Boolean)[0];
  if (isLocale(segment)) return segment;
  return null;
}

export function stripLocaleFromPath(pathname: string): string {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length === 0) return '/';

  if (isLocale(parts[0])) {
    const rest = parts.slice(1).join('/');
    return rest ? `/${rest}` : '/';
  }

  return pathname.startsWith('/') ? pathname : `/${pathname}`;
}

export function withLocale(pathname: string, locale: Locale): string {
  const normalized = stripLocaleFromPath(pathname);
  if (normalized === '/') return `/${locale}`;
  return `/${locale}${normalized}`;
}

export function detectLocaleFromAcceptLanguage(header: string | null): Locale {
  if (!header) return DEFAULT_LOCALE;

  const normalized = header.toLowerCase();
  if (normalized.includes('en')) return 'en';
  if (normalized.includes('es')) return 'es';

  return DEFAULT_LOCALE;
}

export function resolveMarket(countryCode?: string | null): Market {
  const country = countryCode?.toUpperCase();
  if (!country) return 'global';
  if (country === 'ES') return 'es';
  if (LATAM_COUNTRIES.has(country)) return 'latam';
  return 'global';
}

export function localizeHref(locale: Locale, href: string): string {
  if (!href.startsWith('/')) return href;
  return withLocale(href, locale);
}
