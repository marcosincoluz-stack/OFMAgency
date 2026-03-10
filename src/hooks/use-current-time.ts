import { useEffect, useState } from 'react';

export const useCurrentTime = (locale: string = 'en', unknownLocation = 'Unknown') => {
  const [currentTime, setCurrentTime] = useState<string>('--:--');
  const [currentLocation, setCurrentLocation] = useState<string>('');

  useEffect(() => {
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
    const timeInterval = setInterval(updateTime, 1000);

    const getLocation = () => {
      try {
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const cityName =
          timeZone.split('/').pop()?.replace(/_/g, ' ') || timeZone;
        setCurrentLocation(cityName);
      } catch {
        setCurrentLocation(unknownLocation);
      }
    };

    getLocation();

    return () => {
      clearInterval(timeInterval);
    };
  }, [locale, unknownLocation]);

  return { currentTime, currentLocation };
};
