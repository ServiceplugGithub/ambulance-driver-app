import { RootState } from "@/store";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import SendOtpScreen from "./auth/send-otp";
import Dashboard from "./home/home";
import LocationPromptScreen from "./location-prompt";
import SplashScreen from "./SplashScreen";


const Stack = createNativeStackNavigator<any>();

const ApplicationNavigator: React.FC = () => {
  const { isAuthenticated, isInitialized } = useSelector((state: RootState) => state.login);

  if (!isInitialized) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator>
      {!isAuthenticated ? (
        <Stack.Group screenOptions={{ headerShown: false }}>
          <Stack.Screen 
            name="auth/send-otp" 
            component={SendOtpScreen} 
          />
          {/* <Stack.Screen
            name={navigateConst.AUTH.OTP_VERIFY}
            component={OtpVerifyScreen}
          /> */}
          {/* <Stack.Screen
            name="not-found"
            component={NotFoundScreen}
            options={{
              presentation: "modal",
              animation: "slide_from_bottom",
            }}
          /> */}
        </Stack.Group>
      ) : (
        <Stack.Group screenOptions={{ headerShown: false }}>
          <Stack.Screen 
            name="home/home" 
            component={Dashboard} 
          />
          {/* <Stack.Screen 
            name="home/menu" 
            component={MenuScreen} 
          />
          <Stack.Screen 
            name="home/plus" 
            component={PlusScreen} 
          /> */}
          <Stack.Screen
            name="location-prompt"
            component={LocationPromptScreen}
            options={{
              presentation: "modal",
              animation: "slide_from_bottom",
            }}
          />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default ApplicationNavigator;