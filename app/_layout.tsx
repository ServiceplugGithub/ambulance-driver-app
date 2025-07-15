import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { localStorageKey } from "@/constants/common";
import { Inter } from "@/constants/fonts";
import { useColorScheme } from "@/hooks/useColorScheme";
import { store } from "@/store";
import { getStorage } from "@/utils/storage";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loaded] = useFonts({
    [Inter.Black]: require("../assets/fonts/Inter/Inter-Black.ttf"),
    [Inter.Bold]: require("../assets/fonts/Inter/Inter-Bold.ttf"),
    [Inter.ExtraBold]: require("../assets/fonts/Inter/Inter-ExtraBold.ttf"),
    [Inter.ExtraLight]: require("../assets/fonts/Inter/Inter-ExtraLight.ttf"),
    [Inter.Light]: require("../assets/fonts/Inter/Inter-Light.ttf"),
    [Inter.Medium]: require("../assets/fonts/Inter/Inter-Medium.ttf"),
    [Inter.Regular]: require("../assets/fonts/Inter/Inter-Regular.ttf"),
    [Inter.SemiBold]: require("../assets/fonts/Inter/Inter-SemiBold.ttf"),
    [Inter.Thin]: require("../assets/fonts/Inter/Inter-Thin.ttf"),
  });

  const router = useRouter();

  const initApp = async () => {
    // getAnalytics().logAppOpen()
    const accessToken = await getStorage(localStorageKey.accessToken);
    console.log("accesstoken", accessToken);
    setIsAuthenticated(!!accessToken);
    if (!isAuthenticated) {
      router.navigate({ pathname: "/auth/send-otp" });
    }

    // else {
    //   console.log('navigating to home')
    //   router.navigate({ pathname: '/home' });
    // }
    SplashScreen.hideAsync();
  };

  useEffect(() => {
    if (loaded) {
      initApp();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const authRoute = () => {
    return (
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="auth/verify-otp" />
        <Stack.Screen name="auth/send-otp" />
        <Stack.Screen
          name="auth/user-not-found"
          options={{
            presentation: "modal",
            animation: "slide_from_bottom",
          }}
        />
      </Stack>
    );
  };

  const protectedRoute = () => {
    return (
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="home/index" />
        <Stack.Screen name="home/menu" />
        <Stack.Screen name="home/plus" />
        <Stack.Screen
          name="location-prompt"
          options={{
            presentation: "modal",
            animation: "slide_from_bottom",
          }}
        />

        {/* <Stack.Screen name="+not-found" /> */}
      </Stack>
    );
  };

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        {isAuthenticated ? protectedRoute() : authRoute()}
        <Toast position="bottom" bottomOffset={20} />
      </SafeAreaProvider>
    </Provider>
  );
}
