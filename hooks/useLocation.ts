import { useState, useCallback } from 'react';

interface LocationState {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
  loading: boolean;
}

export const useLocation = () => {
  const [location, setLocation] = useState<LocationState>({
    latitude: null, longitude: null, error: null, loading: false,
  });

  const getLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocation(prev => ({ ...prev, error: 'Geolocation not supported' }));
      return;
    }
    setLocation(prev => ({ ...prev, loading: true, error: null }));
    navigator.geolocation.getCurrentPosition(
      (pos) => setLocation({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        error: null, loading: false,
      }),
      (err) => setLocation(prev => ({ ...prev, error: err.message, loading: false })),
      { enableHighAccuracy: true }
    );
  }, []);

  const shareLocation = useCallback(() => {
    if (location.latitude && location.longitude) {
      const url = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
      if (navigator.share) {
        navigator.share({ title: 'My Location - EMERGENCY', url });
      } else {
        navigator.clipboard.writeText(url);
      }
      return url;
    }
    return null;
  }, [location]);

  return { ...location, getLocation, shareLocation };
};
