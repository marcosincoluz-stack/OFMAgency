'use client';

import { Clock } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';

import Logo from '@/components/layout/logo';
import { Button } from '@/components/ui/button';
import { useCurrentTime } from '@/hooks/use-current-time';
import { CONTACT_EMAIL, NAV_ITEMS, SOCIAL_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/elements/theme-toggle';

import '@/styles/navbar-animation.css';

export const Navbar = ({ pathname }: { pathname: string }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isNavbarHidden, setIsNavbarHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isOpening, setIsOpening] = useState(false);
  const { currentTime } = useCurrentTime();

  // Handle scroll to hide/show navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollThreshold = 50; // Minimum scroll before hiding

      if (currentScrollY < scrollThreshold) {
        // Always show navbar near the top
        setIsNavbarHidden(false);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down - hide navbar
        setIsNavbarHidden(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

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
    // When opening animation completes (column-five-open is last to finish)
    if (isMenuOpen && e.animationName === 'column-five-open') {
      setIsAnimating(false);
    }
    // When closing animation completes (column-five-close is last to finish)
    else if (!isMenuOpen && e.animationName === 'column-five-close') {
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
          pathname === '/' && 'inset-x-5 pt-10.5 md:inset-x-6 md:py-12.5',
          pathname === '/' && 'text-background',
          pathname !== '/' && isMenuOpen && 'text-background',
          'fixed',
          'mt-14',
          isNavbarHidden &&
            !isMenuOpen &&
            '-translate-y-[calc(100%+3.5rem)]',
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
              aria-label="Toggle menu"
            >
              <span className="sr-only">Open main menu</span>
              <div className="hamburger-lines">
                <span
                  aria-hidden="true"
                  className={cn(
                    'hamburger-line hamburger-line-1',
                    isMenuOpen && 'menu-open',
                  )}
                ></span>
                <span
                  aria-hidden="true"
                  className={cn(
                    'hamburger-line hamburger-line-2',
                    isMenuOpen && 'menu-open',
                  )}
                ></span>
                <span
                  aria-hidden="true"
                  className={cn(
                    'hamburger-line hamburger-line-3',
                    isMenuOpen && 'menu-open',
                  )}
                ></span>
              </div>
            </button>
          </div>
          <div onClick={() => setIsMenuOpen(false)}>
            <Logo />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={isMenuOpen ? 'open' : 'closed'}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={cn('hidden w-20 justify-end gap-6 md:flex')}
            >
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
                    className={cn(
                      (pathname === '/' || isAnimating) && 'text-background',
                    )}
                  >
                    <a href="/contact">Work with Hive</a>
                  </Button>
                  <Button
                    variant="secondary"
                    className="hover:bg-secondary cursor-normal pointer-events-none"
                    tabIndex={-1}
                  >
                    <Clock />
                    {currentTime}
                  </Button>
                  <ThemeToggle />
                </>
              )}
            </motion.div>
          </AnimatePresence>
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
            {NAV_ITEMS.map((item) => (
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
