import { localStorageKey, secureStorageKey } from "@/constants/common";
import * as SecureStore from "expo-secure-store";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import axiosInstance from "./axios-instance";
import { setSecureStorage, setStorage } from "./storage";

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


