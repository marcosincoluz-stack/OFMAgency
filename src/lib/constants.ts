import { getDictionary } from '@/lib/i18n-dictionary';
import { localizeHref, type Locale } from '@/lib/i18n';

export function getNavItems(locale: Locale) {
  const dict = getDictionary(locale);

  return [
    { label: dict.nav.home, href: localizeHref(locale, '/') },
    { label: dict.nav.services, href: localizeHref(locale, '/services') },
    { label: dict.nav.work, href: localizeHref(locale, '/projects') },
    { label: dict.nav.studio, href: localizeHref(locale, '/about') },
    { label: dict.nav.blocks, href: localizeHref(locale, '/bloques') },
    { label: dict.nav.contact, href: localizeHref(locale, '/contact') },
  ] as const;
}

export const SOCIAL_LINKS = [
  {
    name: 'Instagram',
    href: 'https://instagram.com/hive',
    icon: 'Instagram',
  },
  {
    name: 'X/Twitter',
    href: 'https://x.com/hive',
    icon: 'X / Twitter',
  },
] as const;

export const CONTACT_EMAIL = 'contact@hive.com';

export const CONTACT_TELEGRAM_HANDLE = '@tu_agencia_ofm';
export const CONTACT_TELEGRAM_URL = `https://t.me/${CONTACT_TELEGRAM_HANDLE.replace('@', '')}`;
