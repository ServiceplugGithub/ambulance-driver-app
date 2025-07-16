import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';

const LOCATION_TASK_NAME = 'background-location-task';

export const startBackgroundLocation = async (socket: any,) => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    console.warn('Location permission not granted');
    return;
  }

  await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
    accuracy: Location.Accuracy.High,
    timeInterval: 10000, // every 10 seconds
    distanceInterval: 0,
    showsBackgroundLocationIndicator: true,
    foregroundService: {
      notificationTitle: 'Tracking ambulance location',
      notificationBody: 'Location is being used to track ambulance position.',
    },
  });
};

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error('Location task error:', error);
    return;
  }

  const { locations } = data as { locations: Location.LocationObject[] };

  const latest = locations[0];
  if (latest?.coords) {
    const { latitude, longitude } = latest.coords;
    await AsyncStorage.setItem(
      'ambulance_location',
      JSON.stringify({ latitude, longitude, timestamp: Date.now() })
    );
    console.log('Background location saved:', latitude, longitude);
  }
});
