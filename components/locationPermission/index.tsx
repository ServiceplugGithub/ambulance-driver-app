/* eslint-disable react-hooks/exhaustive-deps */
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { AppState } from 'react-native';
// import * as Permissions from 'expo-permissions';

type LocationStatus = {
  hasPermission: boolean;
  isGpsEnabled: boolean;
  error: string | null;
};

const useLocationGuard = (isActive: boolean): LocationStatus => {
  const [locationStatus, setLocationStatus] = useState<LocationStatus>({
    hasPermission: false,
    isGpsEnabled: false,
    error: null,
  });

  const checkLocation = async (): Promise<void> => {
    if (!isActive) return; // Skip if not active
    
    try {
      // 1. Check if permission is granted
      const { status } = await Location.requestForegroundPermissionsAsync();
      const hasPermission = status === 'granted';

      if (!hasPermission) {
        setLocationStatus(prev => ({
          ...prev,
          hasPermission: false,
          isGpsEnabled: false,
          error: 'Location permission not granted',
        }));
        return;
      }

      // 2. Check if GPS is actually ON
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        // timeout: 5000,
      });

      if (location) {
        setLocationStatus({
          hasPermission: true,
          isGpsEnabled: true,
          error: null,
        });
      }
    } catch (err) {
      setLocationStatus({
        hasPermission: false,
        isGpsEnabled: false,
        error: err instanceof Error ? err.message : 'Unknown location error',
      });
    }
  };

  useEffect(() => {
    if (!isActive) return; // Don't set up listeners if not active
    
    checkLocation();

    const appStateSub = AppState.addEventListener('change', (state) => {
      if (state === 'active') checkLocation();
    });

    const interval = setInterval(checkLocation, 10000); // Reduced from 1s to 10s for better performance

    return () => {
      appStateSub?.remove();
      clearInterval(interval);
    };
  }, [isActive]); // Re-run effect when isActive changes

  return locationStatus;
};

export default useLocationGuard;