'use client';

import { useCurrentTime } from '@/hooks/use-current-time';
import { CONTACT_EMAIL, SOCIAL_LINKS, getNavItems } from '@/lib/constants';
import { getDictionary } from '@/lib/i18n-dictionary';
import { type Locale } from '@/lib/i18n';
import { cn } from '@/lib/utils';

const Footer = ({ locale }: { locale: Locale }) => {
  const dict = getDictionary(locale);
  const navItems = getNavItems(locale);
  const { currentTime, currentLocation } = useCurrentTime(
    locale,
    dict.footer.unknownLocation,
  );

  return (
    <div className="section-padding pb-0!">
      <footer
        className={cn(
          'relative m-5 mt-0! overflow-hidden py-8 md:m-6',
          'bg-foreground text-background dark:bg-background dark:text-foreground dark:invert',
        )}
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_10%,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0.04)_38%,rgba(0,0,0,0.12)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.08)_0%,transparent_35%,rgba(255,255,255,0.04)_70%,transparent_100%)]" />
        </div>

        <div className="bigger-container relative z-10 flex min-h-[min(50dvh,440px)] flex-col justify-between">
          <div className="flex items-center justify-center gap-6 md:justify-between">
            <span className="hidden text-xs font-semibold tracking-[0.24em] uppercase md:inline">
              Velour
            </span>
            <nav className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className="animated-underline">
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="hidden items-center gap-6 md:flex">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="animated-underline"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-center gap-6 md:hidden">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.icon}
                </a>
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 md:justify-between">
              <a className="animated-underline" href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>
              <span>
                {currentTime} · {currentLocation || dict.footer.unknownLocation}
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
