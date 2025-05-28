import { Image } from 'expo-image';
import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';

import RenderFormElement from '@/components/form-builder';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { images } from '@/assets';
import AppScreen from '@/components/AppScreen';
import AppText from '@/components/AppText';
import CountdownTimer from '@/components/auth/CountdownTimer';
import HeadingSubtitle from '@/components/auth/HeadingSubtitle';
import CustomButton from '@/components/custom-button/CustomButton';
import Logo from '@/components/Logo';
import { ColorsType } from '@/constants/colors';
import { blurhash } from '@/constants/common';
import { fontFamily } from '@/constants/fonts';
import { ButtonVariant } from '@/enums/button-variant.enum';
import { FormInputType } from '@/enums/form-input.enum';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
// import { useAuthStore } from '@/stores/auth.store';
import { isEmpty } from 'lodash';


const schema = z.object({
  otp: z.string().min(1, { message: 'Required' }).max(4, { message: 'OTP cannot exceed 4 digits' }).regex(/^\d+$/, { message: 'OTP must be numeric' }),
});

type FormData = z.infer<typeof schema>;


const SendOtpScreen = () => {

  const color: ColorsType = useThemeColor() as ColorsType;
  const style = styles(color);

  const router = useRouter();

  const [over, setOver] = useState(false);
  const [isResending, setResend] = useState(false);
  const [resetTimer, onResetTimer] = useState(false);
  const [loading, setLoading] = useState(false);

  // store
  // const { verifyOtp } = useAuthStore(state => state);




  const {
    control,
    handleSubmit,
    setFocus,
    setValue,
    formState: { errors, isValid, dirtyFields },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      otp: ''
    },
  });


  const onSubmit = async (data: any) => {
    try {
      Keyboard.dismiss();
      setLoading(true);
      // const response = await verifyOtp(data.otp);
      // console.log('res', response)

      // if (response) {
      //   router.navigate({ pathname: '/home' });
      // }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const onBtResendCode = () => { }



  return (

    <AppScreen containerStyle={style.container}  >
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ width: '100%', flex: 1 }}

      >
        <ScrollView contentContainerStyle={style.scrollContainer} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" >


          <View style={style.fieldContainer}>
            <CustomButton variant={ButtonVariant.outlined}
              label='Back'
              containerStyle={style.backButton}
              onPress={() => router.back()}
              LeftIcon={<Ionicons name="arrow-back" size={24} color={color.white} />}
              labelStyle={{ color: color.white }}
            />
            <Image
              style={style.image}
              source={images.loginPageImage}
              contentFit='contain'
              transition={200}
              placeholder={{ blurhash }}

            />

            <HeadingSubtitle containerStyle={{ marginVertical: 16 }} title="OTP Verification" />

            <RenderFormElement
              formInputType={FormInputType.input}
              control={control}
              name="otp"
              // label="Enter OTP"
              error={errors.otp}
              keyboardType="numeric"
              autoCapitalize="none"
              placeholder="Enter OTP"
              textInputStyle={{ letterSpacing: 1.5, fontFamily: fontFamily[500], fontSize: 18 }}
              textAffixStyle={{ letterSpacing: 1.5, fontFamily: fontFamily[500], fontSize: 18 }}
              onChangeText={(value: string) => {
                const specialCharsRegex = /^([0-9])*$/;

                if (value.length <= 4 && specialCharsRegex.test(value)) {
                  setValue('otp', value, { shouldValidate: true, shouldDirty: true });
                }
              }}
            />

            <View style={style.center}>
              <AppText style={style.textSection}>Didn&apos;t recieve the OTP?</AppText>
              {/* <AppTouchableOpacity disabled={!over || isResending} onPress={onBtResendCode}>
                <AppText
                  style={[
                    style.textSection,
                    { marginLeft: 4, color: !over || isResending ? color.secondaryText : color.primary }
                  ]}
                >
                  Resend OTP
                </AppText>
              </AppTouchableOpacity> */}
              <CustomButton containerStyle={{ marginLeft: 4 }} variant={ButtonVariant.text} label='Resend OTP' onPress={onBtResendCode} disabled={!over || isResending} />
              <AppText style={style.text}>
                <CountdownTimer seconds={60} over={over} setOver={setOver} resetTimer={resetTimer} />
              </AppText>
            </View>

            <CustomButton loading={loading} disabled={!isValid || isEmpty(dirtyFields)} containerStyle={{ marginTop: 32 }} label='Verify' onPress={handleSubmit(onSubmit)} />
            <Logo />

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </AppScreen>
  );
};

export default SendOtpScreen;

const styles = (color: ColorsType) => StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16
  },
  scrollContainer: {
    flexGrow: 1,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 1,
    color: color.white,
    borderColor: color.white,
    borderRadius: 25
    // width: 200,
  },
  fieldContainer: { width: '100%', flex: 1 },

  image: { width: '100%', height: 280 },
  centerView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 32,
    marginTop: 'auto'
  },
  center: { flexDirection: 'row', marginTop: 12, marginBottom: 8, justifyContent: 'center' },
  textSection: { color: color.black, alignItems: 'center' },
  text: { color: color.danger },


});

