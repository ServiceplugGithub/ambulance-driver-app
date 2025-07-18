import { Image } from "expo-image";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import RenderFormElement from "@/components/form-builder";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { images } from "@/assets";
import AppScreen from "@/components/AppScreen";
import HeadingSubtitle from "@/components/auth/HeadingSubtitle";
import CustomButton from "@/components/custom-button/CustomButton";
import Logo from "@/components/Logo";
import { ColorsType } from "@/constants/Colors";
import { blurhash } from "@/constants/common";
import { fontFamily } from "@/constants/fonts";
import { FormInputType } from "@/enums/form-input.enum";
import { useThemeColor } from "@/hooks/useThemeColor";
import { loginUserApi } from "@/store/login/LoginApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";

const schema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),

  password: z
    .string()
    .min(5, { message: "Password must be at least 5 digits" })
    .regex(/^\d+$/, { message: "Password must contain only numbers" }),

  usertype: z.literal("driver"),
});

type FormData = z.infer<typeof schema>;

const SendOtpScreen = () => {
  const color: ColorsType = useThemeColor() as ColorsType;
  const style = styles(color);

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    setFocus,
    setValue,
    formState: { errors, isValid, dirtyFields },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      usertype: "driver",
    },
  });

  const dispatch = useDispatch<any>();

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      const result = await dispatch(loginUserApi(data)).unwrap();

      await AsyncStorage.setItem("token", result.token);
      await AsyncStorage.setItem("userId", result.user._id);

      Toast.show({
        type: "success",
        text1: "Login successful",
      });
      router.navigate("/location-prompt");
    } catch (error) {
      Toast.show({
        type: "error",
        text1:
          typeof error === "string" ? error : "Login failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const onBtPolicy = () => {
    router.navigate({ pathname: "/policy/privacy" });
  };

  const onBtTerms = () => {
    router.navigate({ pathname: "/policy/terms" });
  };

  const onBtVendorPolicy = () => {
    router.navigate({ pathname: "/policy/vendor" });
  };

  return (
    <AppScreen containerStyle={style.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ width: "100%", flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={style.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={style.fieldContainer}>
            <Image
              style={style.image}
              source={images.loginPageImage}
              contentFit="contain"
              transition={200}
              placeholder={{ blurhash }}
            />

            <HeadingSubtitle
              containerStyle={{ marginVertical: 16 }}
              title="Welcome back"
            />

            <RenderFormElement
              formInputType={FormInputType.input}
              control={control}
              name="email"
              placeholder="Enter Username"
              autoCapitalize="none"
              keyboardType="default"
              textInputStyle={{
                letterSpacing: 1.5,
                fontFamily: fontFamily[500],
                fontSize: 18,
              }}
              textAffixStyle={{
                letterSpacing: 1.5,
                fontFamily: fontFamily[500],
                fontSize: 18,
              }}
              onChangeText={(value: string) => {
                const allowedRegex = /^[a-zA-Z0-9@'.]*$/;

                if (allowedRegex.test(value)) {
                  setValue("email", value, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }
              }}
            />
            <View style={style.pass}>
              <RenderFormElement
                formInputType={FormInputType.input}
                control={control}
                name="password"
                placeholder="Enter Password"
                autoCapitalize="none"
                secureTextEntry={true}
                keyboardType="default"
                textInputStyle={{
                  letterSpacing: 1.2,
                  fontFamily: fontFamily[500],
                  fontSize: 18,
                }}
                textAffixStyle={{
                  letterSpacing: 1.2,
                  fontFamily: fontFamily[500],
                  fontSize: 18,
                }}
                onChangeText={(value: string) => {
                  setValue("password", value, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
              />
            </View>
            <CustomButton
              containerStyle={{ marginTop: 32 }}
              label="Login"
              onPress={() => {
                handleSubmit(onSubmit)();
                // router.navigate("/location-prompt");
              }}
              // disabled={!isValid || isEmpty(dirtyFields)}
              loading={loading}
            />
            <Logo />
          </View>
          <View style={style.centerView}>
            <HeadingSubtitle subtitle="By signing up, I agree to ServicePlug" />
            <HeadingSubtitle
              isLink
              subtitle="Terms & Conditions"
              onPress={onBtTerms}
            />
            <HeadingSubtitle subtitle="and" />
            <HeadingSubtitle
              isLink
              subtitle="Privacy Policy"
              onPress={onBtPolicy}
            />
            <HeadingSubtitle subtitle="and" />
            <HeadingSubtitle
              isLink
              subtitle="Vendor Policy"
              onPress={onBtVendorPolicy}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </AppScreen>
  );
};

export default SendOtpScreen;

const styles = (color: ColorsType) =>
  StyleSheet.create({
    container: {
      alignItems: "center",
      backgroundColor: "white",
      paddingHorizontal: 16,
    },
    scrollContainer: {
      flexGrow: 1,
    },
    fieldContainer: { width: "100%", flex: 1 },
    image: { width: "100%", height: 280 },
    centerView: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: 10,
      marginBottom: 32,
      marginTop: "auto",
    },
    pass: {
      marginTop: 10,
    },
  });
