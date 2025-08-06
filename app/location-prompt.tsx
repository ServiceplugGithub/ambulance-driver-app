import AppText from "@/components/AppText";
import HeadingSubtitle from "@/components/auth/HeadingSubtitle";
import CustomButton from "@/components/custom-button/CustomButton";
import { localStorageKey } from "@/constants/common";
import { colors } from "@/utils/constants/colors";
import { getLocation } from "@/utils/location";
import { setStorage } from "@/utils/storage";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { navigateAndSimpleReset } from "./navigators/Root";
import { HOME } from "./navigators/navigationConst";

const LocationPromptScreen = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const getAndStoreLocation = async () => {
    try {
      setLoading(true);
      const location = await getLocation();
      if (location && location.coords) {
        const locationString = JSON.stringify(location);
        await setStorage(localStorageKey.userLocationInfo, locationString);
        navigateAndSimpleReset(HOME);
      } else {
        console.log("saflkmw")
        throw new Error("Failed to get coordinates");
      }
    } catch (e) {
      Alert.alert(
        "Location Required",
        "Please enable location to continue using the app.",
        [{ text: "Try Again", onPress: getAndStoreLocation }]
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAndStoreLocation();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Ionicons
        name="location-outline"
        size={128}
        color={colors.primary}
        style={styles.icon}
      />
      <HeadingSubtitle title="Your location is needed" />
      <View style={styles.subtitleWrapper}>
        <AppText style={styles.subtitle}>
          Please provide location access in order to ensure optimal app
          experience.
        </AppText>
      </View>
      {loading ? (
        <ActivityIndicator
          size="large"
          color={colors.primary}
          style={{ marginTop: 30 }}
        />
      ) : (
        <CustomButton
          containerStyle={styles.buttonContainerStyle}
          label="Enable Location Services"
          onPress={getAndStoreLocation}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  subtitle: {
    color: "black",
    width: "80%",
    textAlign: "center",
  },
  subtitleWrapper: {
    marginTop: 20,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainerStyle: {
    marginTop: 20,
    width: "80%",
  },
  icon: {
    color: colors.primary,
  },
});

export default LocationPromptScreen;
