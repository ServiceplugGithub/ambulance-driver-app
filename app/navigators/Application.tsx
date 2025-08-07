import useLocationGuard from "@/components/locationPermission";
import { RootState } from "@/store";
import {
  NavigationContainer,
  NavigationIndependentTree,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from 'react';
import { useSelector } from "react-redux";
import SendOtpScreen from "../auth/send-otp";
import UserNotFoundScreen from "../auth/user-not-found";
import LocationPromptScreen from "../location-prompt";
import Dashboard from "../screens/home";
import ProfileSection from "../screens/profile";
import TrackingSection from "../screens/tracking";
import SplashScreen from "../SplashScreen";
import * as navigateConst from "./navigationConst";
import { navigationRef } from "./Root";

const Stack = createNativeStackNavigator<any>();

const ApplicationNavigator: any = () => {
  const { isAuthenticated, isInitialized } = useSelector(
    (state: RootState) => state.login
  );

  const { hasPermission, isGpsEnabled } = useLocationGuard(isAuthenticated);  

  if (!isInitialized) {
    return <SplashScreen />;
  }

  return (
    <NavigationIndependentTree>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
          {!isAuthenticated ? (
            <Stack.Group screenOptions={{ headerShown: false }}>
              <Stack.Screen
                name={navigateConst.AUTH.SEND_OTP}
                component={SendOtpScreen}
              />
              <Stack.Screen
                name={navigateConst.AUTH.NOT_FOUND_SCREEN}
                component={UserNotFoundScreen}
              />
            </Stack.Group>
          ) : (
            <Stack.Group screenOptions={{ headerShown: false }}>
              <Stack.Screen
                name={navigateConst.LOCATION_PROMPT}
                component={LocationPromptScreen}
                options={{
                  presentation: "modal",
                  animation: "slide_from_bottom",
                }}
              />
              <Stack.Screen name={navigateConst.HOME} component={Dashboard} />
              <Stack.Screen
                name={navigateConst.PROFILE}
                component={ProfileSection}
              />
              <Stack.Screen
                name={navigateConst.TRACKING}
                component={TrackingSection}
              />
              {/* <Stack.Screen 
            name="home/menu" 
            component={MenuScreen} 
          />
          <Stack.Screen 
            name="home/plus" 
            component={PlusScreen} 
          /> */}
            </Stack.Group>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </NavigationIndependentTree>
  );
};

export default ApplicationNavigator;
