import AppScreen from '@/components/AppScreen';
import AppText from '@/components/AppText';
import CustomButton from '@/components/custom-button/CustomButton';
import { ColorsType } from '@/constants/Colors';
import { fontFamily } from '@/constants/fonts';
import { ButtonVariant } from '@/enums/button-variant.enum';
import { useThemeColor } from '@/hooks/useThemeColor';
import { vh } from '@/utils/dimension';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import { navigate } from '../navigators/Root';
import { AUTH } from '../navigators/navigationConst';

const UserNotFoundScreen = () => {
  const color: ColorsType = useThemeColor() as ColorsType;
  const style = styles(color);

  const router = useRouter();
  const goToLogin = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      navigate(AUTH.SEND_OTP)
    }
  }



  return (
    // <View style={styles.container}>
    //   <HeadingSubtitle title = 'User Not Found' subtitle='Please check the number you have entered'/>
    //   <AppText style={styles.phoneNumber}>You Have Entered: {phoneNumber} </AppText>
    //   <CustomButton containerStyle={styles.button} label='Change Number' onPress={goToLogin}/>
    // </View>
    <AppScreen containerStyle={style.container}  >
      <Image
        source={require('@/assets/images/no-results.webp')}
        style={{ width: '80%', height: vh(40), tintColor: color.primary }}
        contentFit='contain'
      />
      <AppText style={style.title}>
        User not found
      </AppText>

      <AppText style={style.message}>
        Please check the creadentials you have entered
      </AppText>

      <AppText style={style.phoneNumber}>
        You Have Entered wrong credentials
      </AppText>

      <CustomButton
        containerStyle={style.button}
        label='Change Username and Password'
        labelStyle={{ fontFamily: fontFamily[600], fontSize: 16 }}
        variant={ButtonVariant.text}
        onPress={goToLogin} />

    </AppScreen>
  );
};

const styles = (color: ColorsType) => StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    justifyContent: 'center'
  },

  fieldContainer: { width: '100%', flex: 1 },


  title: {
    fontSize: 30,
    fontFamily: fontFamily[700],
    color: color.danger,
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: color.text,
    fontFamily: fontFamily[500]
  },
  phoneNumber: {
    color: color.secondaryText,
    fontFamily: fontFamily[600],
    fontSize: 14,
  },
  button: {
    marginTop: 20,
    fontFamily: fontFamily[600],
  }
});

export default UserNotFoundScreen;