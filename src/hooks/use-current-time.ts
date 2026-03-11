import { useEffect, useState } from 'react';

export const useCurrentTime = (locale: string = 'en', unknownLocation = 'Unknown') => {
  const [currentTime, setCurrentTime] = useState<string>('--:--');
  const [currentLocation, setCurrentLocation] = useState<string>('');

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let intervalId: ReturnType<typeof setInterval> | null = null;

    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString(locale === 'es' ? 'es-ES' : 'en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
      setCurrentTime(timeString);
    };

    updateTime();

    // Align updates to the next minute and then refresh every 60s.
    const now = new Date();
    const msUntilNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
    timeoutId = setTimeout(() => {
      updateTime();
      intervalId = setInterval(updateTime, 60_000);
    }, msUntilNextMinute);

    const getLocation = () => {
      try {
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const cityName = timeZone.split('/').pop()?.replace(/_/g, ' ') || timeZone;
        setCurrentLocation(cityName);
      } catch {
        setCurrentLocation(unknownLocation);
      }
    };

    getLocation();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [locale, unknownLocation]);

  return { currentTime, currentLocation };
};
