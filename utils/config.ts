import { localStorageKey } from "@/constants/common";
import * as Application from 'expo-application';
import { Platform } from "react-native";
import "react-native-get-random-values";
import axiosInstance from "./axios-instance";
import { setStorage } from "./storage";

export const getDeviceId = async (): Promise<any> => {
  try {
    if (Platform.OS === 'android') {
      return await Application.getAndroidId(); // Correct async method
    } else {
      return await Application.getIosIdForVendorAsync(); // iOS method
    }
  } catch (error) {
    console.error('Error getting device ID:', error);
    return 'unknown-device-id';
  }
};

export const setSession = async (accessToken: string) => {
  if (accessToken) {
    await setStorage(localStorageKey.accessToken, accessToken);
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  }
};


