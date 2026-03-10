'use client';

import { useEffect, useState } from 'react';

const BANNER_EVENT = 'banner-dismissed';

export const useBannerVisibility = () => {
  // Read localStorage synchronously during initial state to prevent flickering
  const [isBannerVisible, setIsBannerVisible] = useState(() => {
    if (typeof window === 'undefined') return true;
    const bannerDismissed = localStorage.getItem('banner-dismissed');
    return bannerDismissed !== 'true';
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Listen for banner dismissal events from other component instances
    const handleBannerDismissed = () => {
      setIsBannerVisible(false);
    };

    window.addEventListener(BANNER_EVENT, handleBannerDismissed);
    return () => window.removeEventListener(BANNER_EVENT, handleBannerDismissed);
  }, []);

  const dismissBanner = () => {
    setIsBannerVisible(false);
    localStorage.setItem('banner-dismissed', 'true');
    // Notify all other hook instances (navbar, etc.) to update
    window.dispatchEvent(new Event(BANNER_EVENT));
  };

  return { isBannerVisible, dismissBanner, isClient };
};
