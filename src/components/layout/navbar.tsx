'use client';

import { Clock } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

import Logo from '@/components/layout/logo';
import { Button } from '@/components/ui/button';
import { CONTACT_EMAIL, SOCIAL_LINKS, getNavItems } from '@/lib/constants';
import { getDictionary } from '@/lib/i18n-dictionary';
import { localizeHref, stripLocaleFromPath, withLocale, type Locale } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/elements/theme-toggle';
import { useCurrentTime } from '@/hooks/use-current-time';

import '@/styles/navbar-animation.css';

const ONE_YEAR = 60 * 60 * 24 * 365;

export const Navbar = ({
  pathname,
  locale,
}: {
  pathname: string;
  locale: Locale;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isNavbarHidden, setIsNavbarHidden] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const lastScrollYRef = useRef(0);
  const tickingRef = useRef(false);

  const dict = getDictionary(locale);
  const navItems = useMemo(() => getNavItems(locale), [locale]);
  const { currentTime } = useCurrentTime(locale);

  const basePath = stripLocaleFromPath(pathname);
  const isHome = basePath === '/';
  const esPath = withLocale(basePath, 'es');
  const enPath = withLocale(basePath, 'en');

  const setLocaleCookie = (targetLocale: Locale) => {
    document.cookie = `locale=${targetLocale}; Path=/; Max-Age=${ONE_YEAR}; SameSite=Lax`;
  };

  useEffect(() => {
    const handleScroll = () => {
      if (tickingRef.current) return;

      tickingRef.current = true;
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const scrollThreshold = 50;

        if (currentScrollY < scrollThreshold) {
          setIsNavbarHidden(false);
        } else if (currentScrollY > lastScrollYRef.current) {
          setIsNavbarHidden(true);
        }

        lastScrollYRef.current = currentScrollY;
        tickingRef.current = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggle = () => {
    if (!isMenuOpen) {
      setIsOpening(true);
      setShouldRender(true);
      setIsAnimating(true);
      requestAnimationFrame(() => {
        setIsMenuOpen(true);
      });
    } else {
      setIsOpening(false);
      setIsMenuOpen(false);
      setIsAnimating(true);
    }
  };

  const handleAnimationEnd = (e: React.AnimationEvent) => {
    if (isMenuOpen && e.animationName === 'column-five-open') {
      setIsAnimating(false);
    } else if (!isMenuOpen && e.animationName === 'column-five-close') {
      setIsAnimating(false);
      setShouldRender(false);
    }
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <>
      <header
        className={cn(
          'bigger-container inset-x-0 z-50 flex items-center justify-between py-5 transition-transform duration-700 ease-in-out md:py-6',
          isHome && 'inset-x-5 pt-6 md:inset-x-6 md:py-8',
          isHome && 'text-background',
          !isHome && isMenuOpen && 'text-background',
          'fixed',
          'mt-2',
          isNavbarHidden && !isMenuOpen && '-translate-y-[calc(100%+3.5rem)]',
        )}
      >
        <div className="flex flex-1 flex-row-reverse items-center justify-between md:flex-row">
          <div className="flex w-20 justify-end md:justify-start">
            <button
              onClick={handleToggle}
              className={cn(
                'relative z-50 h-3.5 w-[18px] cursor-pointer',
                'after:absolute after:-inset-2 after:content-[""]',
              )}
              aria-label={dict.nav.toggleMenu}
            >
              <span className="sr-only">{dict.nav.openMenu}</span>
              <div className="hamburger-lines">
                <span
                  aria-hidden="true"
                  className={cn('hamburger-line hamburger-line-1', isMenuOpen && 'menu-open')}
                />
                <span
                  aria-hidden="true"
                  className={cn('hamburger-line hamburger-line-2', isMenuOpen && 'menu-open')}
                />
                <span
                  aria-hidden="true"
                  className={cn('hamburger-line hamburger-line-3', isMenuOpen && 'menu-open')}
                />
              </div>
            </button>
          </div>
          <div onClick={() => setIsMenuOpen(false)}>
            <Logo />
          </div>

          <div className={cn('hidden shrink-0 items-center justify-end gap-6 md:flex')}>
            {isMenuOpen ? (
              <>
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.name}
                    className="animated-underline flex h-9 items-center justify-center whitespace-nowrap"
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.icon}
                  </a>
                ))}
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  asChild
                  className={cn((isHome || isAnimating) && 'text-background')}
                >
                  <a href={localizeHref(locale, '/contact')}>{dict.nav.workWithUs}</a>
                </Button>
                <div className="flex items-center rounded-full border border-border/60 bg-background/60 p-0.5 text-xs backdrop-blur-sm">
                  <a
                    href={esPath}
                    onClick={() => setLocaleCookie('es')}
                    className={cn(
                      'rounded-full px-2 py-1 transition-colors',
                      locale === 'es' ? 'bg-foreground text-background' : 'text-foreground/70',
                    )}
                  >
                    {dict.localeSwitcher.es}
                  </a>
                  <a
                    href={enPath}
                    onClick={() => setLocaleCookie('en')}
                    className={cn(
                      'rounded-full px-2 py-1 transition-colors',
                      locale === 'en' ? 'bg-foreground text-background' : 'text-foreground/70',
                    )}
                  >
                    {dict.localeSwitcher.en}
                  </a>
                </div>
                <Button
                  variant="secondary"
                  className="hover:bg-secondary cursor-normal pointer-events-none"
                  tabIndex={-1}
                >
                  <Clock />
                  <span>{currentTime}</span>
                </Button>
                <ThemeToggle />
              </>
            )}
          </div>
        </div>
      </header>

      <div
        className={cn(
          'bg-foreground text-background navbar-initial fixed inset-0 z-40',
          shouldRender && isMenuOpen && 'navbar-columns-open',
          shouldRender && !isMenuOpen && !isOpening && 'navbar-columns-close',
          !shouldRender && 'hidden',
        )}
        onAnimationEnd={handleAnimationEnd}
      >
        <nav className="flex h-full flex-col items-center justify-between py-6">
          <div className="flex flex-1 flex-col items-center justify-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  'animated-underline text-4xl uppercase after:-bottom-1 after:h-0.5',
                  pathname === item.href && 'active-underline',
                )}
              >
                {item.label}
              </a>
            ))}
          </div>
          <a className="animated-underline" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
        </nav>
      </div>
    </>
  );
};
