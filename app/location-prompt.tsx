import AppText from '@/components/AppText';
import HeadingSubtitle from '@/components/auth/HeadingSubtitle';
import CustomButton from '@/components/custom-button/CustomButton';
import { colors } from '@/utils/constants/colors';
import { getLocation } from '@/utils/location';
import { setStorage } from '@/utils/storage';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { useAuthStore } from '@/stores/auth.store';
import { localStorageKey } from '@/constants/common';

const LocationPromptScreen = () => {
  const router = useRouter();

  // const { setLocationOptOut } = useAuthStore(state => state);


  //navigate to home if location info is set
  const locationEnableClick = async () => {
    const location = await getLocation();
    const locationString = JSON.stringify(location);
    await setStorage(localStorageKey.userLocationInfo, locationString);
    // router.navigate({ pathname: '/home' });
  }


  // const locationInfoNotNowClick = async () => {
  //   setLocationOptOut(true);
  // }




  return (
    <>
      <SafeAreaView style={styles.container}>
        {/* location icon */}
        <Ionicons name="location-outline" size={128} color="blue" style={styles.icon} />
        <HeadingSubtitle title='Your location is needed'></HeadingSubtitle>
        <View style={styles.subtitleWrapper}>
          <AppText style={styles.subtitle}>Please provide location access inorder to ensure optimal app experience</AppText>
        </View>
        <CustomButton containerStyle={styles.buttonContainerStyle} label='Enable Location Services' onPress={locationEnableClick}></CustomButton>
        {/* <AppTouchableOpacity style={styles.notNowContainer} onPress={locationInfoNotNowClick}>
          <AppText style={styles.notNowText}>Not Now</AppText>
        </AppTouchableOpacity> */}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'black',
    width: "80%",
    textAlign: 'center'
  },
  subtitleWrapper: {
    marginTop: 20,
    width: "100%",
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainerStyle: {
    marginTop: 20,
    width: "80%"
  },
  notNowContainer: {
    marginTop: 20
  },
  icon: {
    color: colors.primary,
  },
  notNowText: {
    color: colors.primary
  }
});

export default LocationPromptScreen;