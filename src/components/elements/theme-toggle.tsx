'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps = {}) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
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

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      data-theme-toggle
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      className={className}
    >
      <span className="relative inline-flex size-5 items-center justify-center">
        <Sun
          className={`absolute size-5 text-yellow-500 transition-all duration-300 ${
            theme === 'dark' ? 'scale-0 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'
          }`}
        />
        <Moon
          className={`absolute size-5 text-blue-400 transition-all duration-300 ${
            theme === 'dark' ? 'scale-100 rotate-0 opacity-100' : 'scale-0 -rotate-90 opacity-0'
          }`}
        />
      </span>
    </Button>
  );
}
