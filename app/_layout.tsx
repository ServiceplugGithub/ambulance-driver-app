import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { Suspense, useEffect, useState } from "react";
import "react-native-reanimated";

import ErrorBoundary from "@/components/error-boundary";
import LoadingScreen from "@/components/loading";
import NoInternetScreen from "@/components/noInternet";
import { Inter } from "@/constants/fonts";
import { store } from "@/store";
import { authAction } from "@/store/login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Provider, useDispatch } from "react-redux";
import { CommonProvider } from "./contexts/CommonContext";
import nativepapertheme from "./nativepapertheme";
import ApplicationNavigator from "./navigators/Application";

SplashScreen.preventAutoHideAsync();

function AppContent() {
  const dispatch = useDispatch();
  const [isConnected, setIsConnected] = useState(true);

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

  const initApp = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("token");
      const userId = await AsyncStorage.getItem("userId");

      if (accessToken) {
        dispatch(
          authAction.initialize({ isAuthenticated: true, user: userId })
        );
      } else {
        dispatch(authAction.initialize({ isAuthenticated: false, user: null }));
      }
    } catch (error) {
      console.error("Initialization error:", error);
    } finally {
      await SplashScreen.hideAsync();
    }
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected ?? false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (loaded) {
      initApp();
    }
  }, [loaded]);

  if (!loaded) return null;

  if (!isConnected) return <NoInternetScreen />;

  return (
    <>
      <CommonProvider>
        <ApplicationNavigator />
      </CommonProvider>
      {/* <Toast position="bottom" bottomOffset={20} /> */}
    </>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ width: "100%", height: "100%" }}>
        <Provider store={store}>
          <PaperProvider theme={nativepapertheme}>
            <ErrorBoundary>
              <Suspense fallback={<LoadingScreen />}>
                <AppContent />
              </Suspense>
            </ErrorBoundary>
          </PaperProvider>
        </Provider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
