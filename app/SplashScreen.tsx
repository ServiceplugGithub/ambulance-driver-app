import { fontFamily } from '@/constants/fonts';
import { colors } from '@/utils/constants/colors';
import React from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native';

const SplashScreen = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} animated />
      <View  style={styles.container}>
      {/* <Box flex="1"> */}
        <View style={styles.innerContainer}>
        {/* <Center height="100%"> */}
          {/* <Logo withTagLine style={styles.logo}/> */}
          <ActivityIndicator color={colors.emerald} size="large" style={styles.indicator} />
        {/* </Center> */}
        </View>
      {/* </Box> */}
      </View>
    </>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  logo: { fontSize: 40, fontFamily: fontFamily[700] },
  container: { flex: 1 },
  innerContainer: { justifyContent: 'center', alignItems: 'center', height: '100%'},
  indicator: { marginTop: 8 }
})