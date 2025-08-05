import { useEffect } from "react";
import { Alert, Platform } from "react-native";
import {
  check,
  Permission,
  PERMISSIONS,
  request,
  RESULTS,
} from "react-native-permissions";

export const useLocationPermission = () => {
  useEffect(() => {
    const checkLocationPermission = async () => {
      try {
        const permission: Permission =
          Platform.OS === "android"
            ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
            : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

        const result = await check(permission);
        if (result !== RESULTS.GRANTED) {
          const reqResult = await request(permission);
          if (reqResult !== RESULTS.GRANTED) {
            Alert.alert("Permission Required", "Location access is needed.");
          }
        }
      } catch (error) {
        console.warn("Location permission check failed", error);
      }
    };

    checkLocationPermission();
  }, []);
};
