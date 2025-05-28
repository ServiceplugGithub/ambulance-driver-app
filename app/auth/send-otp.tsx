import { Image } from 'expo-image';
import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';

import RenderFormElement from '@/components/form-builder';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { images } from '@/assets';
import AppScreen from '@/components/AppScreen';
import HeadingSubtitle from '@/components/auth/HeadingSubtitle';
import CustomButton from '@/components/custom-button/CustomButton';
import Logo from '@/components/Logo';
import { ColorsType } from '@/constants/colors';
import { blurhash } from '@/constants/common';
import { fontFamily } from '@/constants/fonts';
import { FormInputType } from '@/enums/form-input.enum';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useRouter } from 'expo-router';
import { isEmpty } from 'lodash';
// import { useAuthStore } from '@/stores/auth.store';
import { ErrorCode } from '@/enums/error-code.enum';
import { getErrorMessage } from '@/utils/common';
import Toast from 'react-native-toast-message';

const schema = z.object({
    phoneNumber: z.string().min(10, { message: 'Required' }).max(10, { message: 'Phone number cannot exceed 10 digits' }).regex(/^\d+$/, { message: 'Phone number must be numeric' }),
});

type FormData = z.infer<typeof schema>;


const SendOtpScreen = () => {
    const color: ColorsType = useThemeColor() as ColorsType;
    const style = styles(color);

    const router = useRouter();

    const [loading, setLoading] = useState(false);

    // store
    // const sendOtp = useAuthStore(state => state.sendOtp);

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
            phoneNumber: ''
        },
    });


    const onSubmit = async (data: any) => {
        try {
            Keyboard.dismiss();
            setLoading(true);
            // const response = await sendOtp(data.phoneNumber);

            // console.log('res', response)
            // if (response) {
            //     router.navigate({ pathname: '/auth/verify-otp' });
            // }
        } catch (err: any) {
            console.log("asdfkadjgldf", err);
            const errMsg = getErrorMessage(err);
            if (err?.data?.errCode === ErrorCode.USER_NOT_FOUND) {
                router.navigate({ pathname: '/auth/user-not-found' });
            } else {
                Toast.show({
                    type: "error",
                    text1: errMsg,
                });
            }
        } finally {
            setLoading(false);
        }
    };


    const onBtPolicy = () => {
        router.navigate({ pathname: '/policy/privacy' });
    };

    const onBtTerms = () => {
        router.navigate({ pathname: '/policy/terms' });
    };

    const onBtVendorPolicy = () => {
        router.navigate({ pathname: '/policy/vendor' });
    };


    return (

        <AppScreen containerStyle={style.container}  >
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ width: '100%', flex: 1 }}

            >
                <ScrollView contentContainerStyle={style.scrollContainer} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" >


                    <View style={style.fieldContainer}>
                        <Image
                            style={style.image}
                            source={images.loginPageImage}
                            contentFit='contain'
                            transition={200}
                            placeholder={{ blurhash }}

                        />

                        <HeadingSubtitle containerStyle={{ marginVertical: 16 }} title="Welcome back" />

                        <RenderFormElement
                            formInputType={FormInputType.input}
                            control={control}
                            name="phoneNumber"
                            // label="Mobile Number"
                            textAffix="+91"
                            // error={errors.phoneNumber}
                            keyboardType="numeric"
                            autoCapitalize="none"
                            placeholder="Enter Mobile Number"
                            textInputStyle={{ letterSpacing: 1.5, fontFamily: fontFamily[500], fontSize: 18 }}
                            textAffixStyle={{ letterSpacing: 1.5, fontFamily: fontFamily[500], fontSize: 18 }}
                            onChangeText={(value: string) => {
                                const specialCharsRegex = /^([0-9])*$/;

                                if (value.length <= 10 && specialCharsRegex.test(value)) {
                                    setValue('phoneNumber', value, { shouldValidate: true, shouldDirty: true });
                                }
                            }}
                        />
                        <CustomButton containerStyle={{ marginTop: 32 }} label='Send OTP' onPress={handleSubmit(onSubmit)} disabled={!isValid || isEmpty(dirtyFields)} loading={loading} />
                        <Logo />

                    </View>
                    <View style={style.centerView}>
                        <HeadingSubtitle subtitle="By signing up, I agree to ServicePlug" />
                        <HeadingSubtitle isLink subtitle="Terms & Conditions" onPress={onBtTerms} />
                        <HeadingSubtitle subtitle="and" />
                        <HeadingSubtitle isLink subtitle="Privacy Policy" onPress={onBtPolicy} />
                        <HeadingSubtitle subtitle="and" />
                        <HeadingSubtitle isLink subtitle="Vendor Policy" onPress={onBtVendorPolicy} />
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
});