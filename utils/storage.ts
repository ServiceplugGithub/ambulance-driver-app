import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

/**
 * Sets a value in AsyncStorage.
 * @param key - The key under which the value is stored.
 * @param value - The value to store. Can be a string, number, or object (which will be stringified).
 */
export const setStorage = async (key: string, value: any): Promise<void> => {
  try {
    const stringValue = JSON.stringify(value); // Stringify the value before saving
    await AsyncStorage.setItem(key, stringValue);
  } catch (error) {
    console.error("Error setting data in AsyncStorage:", error);
  }
};

/**
 * Gets a value from AsyncStorage.
 * @param key - The key for which to retrieve the value.
 * @returns The value stored in AsyncStorage, parsed as the original type.
 */
export const getStorage = async <T>(key: string): Promise<T | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value); // Parse the stringified value back to original type
    }
    return null;
  } catch (error) {
    console.error("Error getting data from AsyncStorage:", error);
    return null;
  }
};

/**
 * Removes a value from AsyncStorage.
 * @param key - The key to remove from AsyncStorage.
 */
export const removeStorage = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing data from AsyncStorage:", error);
  }
};

/**
 * Clears all data from AsyncStorage.
 */
export const clearStorage = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error("Error clearing AsyncStorage:", error);
  }
};

export const setSecureStorage = async (
  key: string,
  value: string
): Promise<void> => {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    console.error("Error setting data in SecureStore:", error);
  }
};

export const getSecureStorage = async (key: string): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.error("Error getting data from SecureStore:", error);
    return null;
  }
};
