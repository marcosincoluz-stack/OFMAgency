'use client';

import { useEffect, useState, useRef } from 'react';

import { motion as m } from 'motion/react';

import { Button } from '@/components/ui/button';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps = {}) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const buttonRef = useRef<HTMLButtonElement>(null);
  const storageKey = 'theme';

  useEffect(() => {
    // Get initial theme from localStorage, default to 'dark' if none exists
    const savedTheme = localStorage.getItem(storageKey) as
      | 'light'
      | 'dark'
      | null;
    const initialTheme = savedTheme || 'light';
    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
    // Also set the data attribute for Starlight
    document.documentElement.setAttribute('data-theme', initialTheme);

    // Listen for theme changes
    const handleStorageChange = () => {
      const newTheme = localStorage.getItem(storageKey) as
        | 'light'
        | 'dark'
        | null;
      if (newTheme) {
        setTheme(newTheme);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Listen for direct DOM class and data-theme changes (for immediate updates)
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains('dark');
      const dataTheme = document.documentElement.getAttribute('data-theme');
      const currentTheme = dataTheme || (isDark ? 'dark' : 'light');
      setTheme(currentTheme as 'light' | 'dark');
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    });

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      observer.disconnect();
    };
  }, []);

  const shineVariant = {
    hidden: {
      opacity: 0,
      scale: 2,
      strokeDasharray: '20, 1000',
      strokeDashoffset: 0,
      filter: 'blur(0px)',
    },
    visible: {
      opacity: [0, 1, 0],
      strokeDashoffset: [0, -50, -100],
      filter: ['blur(2px)', 'blur(2px)', 'blur(0px)'],
      transition: {
        duration: 0.75,
      },
    },
  };

  const raysVariants = {
    hidden: {
      strokeOpacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    visible: {
      strokeOpacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const rayVariant = {
    hidden: {
      pathLength: 0,
      opacity: 0,
      // Start from center of the circle
      scale: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        // Customize timing for each property
        pathLength: { duration: 0.3 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.3 },
      },
    },
  };

  const toggleTheme = async () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (!document.startViewTransition || prefersReducedMotion) {
      // Fallback without transition
      setTheme(newTheme);
      document.documentElement.classList.toggle('dark');
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem(storageKey, newTheme);
      return;
    }

    // Add vertical-wipe-transition class
    document.documentElement.classList.add('vertical-wipe-transition');

    // Start view transition
    const transition = document.startViewTransition(() => {
      // Update DOM synchronously inside the callback
      setTheme(newTheme);
      document.documentElement.classList.toggle('dark');
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem(storageKey, newTheme);
    });

    try {
      // Wait for the transition to complete
      await transition.finished;
    } finally {
      // Clean up transition class after animation completes
      document.documentElement.classList.remove('vertical-wipe-transition');
    }
  };

  const sunPath =
    'M70 49.5C70 60.8218 60.8218 70 49.5 70C38.1782 70 29 60.8218 29 49.5C29 38.1782 38.1782 29 49.5 29C60 29 69.5 38 70 49.5Z';
  const moonPath =
    'M70 49.5C70 60.8218 60.8218 70 49.5 70C38.1782 70 29 60.8218 29 49.5C29 38.1782 38.1782 29 49.5 29C39 45 49.5 59.5 70 49.5Z';

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      data-theme-toggle
      ref={buttonRef}
      className={className}
    >
      <m.svg
        strokeWidth="4"
        strokeLinecap="round"
        width={100}
        height={100}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative"
      >
        <m.path
          variants={shineVariant}
          d={moonPath}
          className={'absolute top-0 left-0 stroke-blue-100'}
          initial="hidden"
          animate={theme === 'dark' ? 'visible' : 'hidden'}
        />

        <m.g
          variants={raysVariants}
          initial="hidden"
          animate={theme === 'light' ? 'visible' : 'hidden'}
          className="stroke-yellow-500 stroke-6"
          style={{ strokeLinecap: 'round' }}
        >
          <m.path
            className="origin-center"
            variants={rayVariant}
            d="M50 2V11"
          />
          <m.path variants={rayVariant} d="M85 15L78 22" />
          <m.path variants={rayVariant} d="M98 50H89" />
          <m.path variants={rayVariant} d="M85 85L78 78" />
          <m.path variants={rayVariant} d="M50 98V89" />
          <m.path variants={rayVariant} d="M23 78L16 84" />
          <m.path variants={rayVariant} d="M11 50H2" />
          <m.path variants={rayVariant} d="M23 23L16 16" />
        </m.g>

        <m.path
          d={sunPath}
          fill="transparent"
          transition={{ duration: 1, type: 'spring' }}
          initial={{ fillOpacity: 0, strokeOpacity: 0, d: sunPath }}
          animate={{
            d: theme === 'dark' ? moonPath : sunPath,
            rotate: theme === 'dark' ? -360 : 0,
            scale: theme === 'dark' ? 2 : 1,
            stroke:
              theme === 'dark'
                ? 'var(--color-blue-400)'
                : 'var(--color-yellow-500)',
            fill:
              theme === 'dark'
                ? 'var(--color-blue-400)'
                : 'var(--color-yellow-500)',
            fillOpacity: 0.35,
            strokeOpacity: 1,
            transition: { delay: 0.1 },
          }}
        />
      </m.svg>
    </Button>
  );
}
