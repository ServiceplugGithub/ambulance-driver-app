import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Suspense, useEffect, useState } from "react";
import "react-native-reanimated";

import ErrorBoundary from "@/components/error-boundary";
import LoadingScreen from "@/components/loading";
import NoInternetScreen from "@/components/noInternet";
import { useLocationPermission } from "@/components/noLocation";
import { Inter } from "@/constants/fonts";
import { RootState, store } from "@/store";
import { authAction } from "@/store/login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { Provider, useDispatch, useSelector } from "react-redux";
import ApplicationNavigator from "./Application";

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

  const { isInitialized } = useSelector((state: RootState) => state.login);

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
      <ApplicationNavigator />
      <Toast position="bottom" bottomOffset={20} />
    </>
  );
}

export default function RootLayout() {
  useLocationPermission();
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <ErrorBoundary>
          <Suspense fallback={<LoadingScreen />}>
            <AppContent />
          </Suspense>
        </ErrorBoundary>
      </SafeAreaProvider>
    </Provider>
  );
}
