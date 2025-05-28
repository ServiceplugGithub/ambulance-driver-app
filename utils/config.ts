import { FirebaseEvent } from "./../enums/firebase-event.enum";
import * as SecureStore from "expo-secure-store";
import { v4 as uuidv4 } from "uuid";
import "react-native-get-random-values";
import { setSecureStorage, setStorage } from "./storage";
import { localStorageKey, secureStorageKey } from "@/constants/common";
import axiosInstance from "./axios-instance";
import analytics from "@react-native-firebase/analytics";

export const getDeviceId = async () => {
  let deviceId = await SecureStore.getItemAsync(secureStorageKey.deviceId);
  //if user has already signed up prior
  if (deviceId) {
    return deviceId;
  } else {
    deviceId = uuidv4();
    await setSecureStorage(secureStorageKey.deviceId, deviceId);
    return deviceId;
  }
};

export const setSession = async (accessToken: string) => {
  if (accessToken) {
    await setStorage(localStorageKey.accessToken, accessToken);
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  }
};

export const logEvent = async (eventName: (typeof FirebaseEvent)[keyof typeof FirebaseEvent], eventParams: any) => {
  await analytics().logEvent(eventName, eventParams);
};
