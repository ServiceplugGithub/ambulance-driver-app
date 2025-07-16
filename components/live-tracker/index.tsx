import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";

let locationWatcher: Location.LocationSubscription | null = null;

export const startLiveLocationTracking = async (
  socket: any,
  setCurrentLocation: (coords: { latitude: number; longitude: number }) => void
) => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    console.warn("Location permission not granted");
    return;
  }

  if (locationWatcher) {
    locationWatcher.remove();
  }

  locationWatcher = await Location.watchPositionAsync(
    {
      accuracy: Location.Accuracy.High,
      timeInterval: 5000,
      distanceInterval: 5,
    },
    async (location) => {
      const { latitude, longitude } = location.coords;
      setCurrentLocation({ latitude, longitude });

      const userId = await AsyncStorage.getItem("userId");
      if (!userId) return;

      socket.emit("locationUpdate", {
        latitude,
        longitude,
        timestamp: Date.now(),
        _id: userId,
      });

      await AsyncStorage.setItem(
        "user_location_info",
        JSON.stringify(location)
      );
      console.log("Live location emitted:", latitude, longitude);
    }
  );
};

export const stopLiveLocationTracking = () => {
  if (locationWatcher) {
    locationWatcher.remove();
    locationWatcher = null;
    console.log("Stopped location tracking");
  }
};
