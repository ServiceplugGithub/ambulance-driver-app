import { ColorsType } from "@/constants/Colors";
import { fontFamily } from "@/constants/fonts";
import { useThemeColor } from "@/hooks/useThemeColor";
import { isEmpty } from "lodash";
import React, { JSX, useState } from "react";
import { Control, Controller, FieldError, FieldValues } from "react-hook-form";
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import AppText from "../AppText";

type Props = {
  fieldStyle?: StyleProp<ViewStyle>;
  labelStyles?: StyleProp<TextStyle>;
  inputStyles?: StyleProp<ViewStyle>;
  textInputStyle?: StyleProp<TextStyle>;
  label?: string;
  control: Control<FieldValues>;
  placeholder: string;
  name: string;
  leftIcon?: string;
  LeftIcon?: JSX.Element;
  RightIcon?: JSX.Element;
  error: FieldError;
  textAffix?: string;
  textAffixStyle?: StyleProp<TextStyle>;
  editable?: boolean;
};

function TextInputController(props: Props) {
  const colors: ColorsType = useThemeColor() as ColorsType;
  const style = styles(colors);
  const {
    fieldStyle,
    label,
    control,
    placeholder,
    name,
    labelStyles,
    inputStyles,
    textInputStyle,
    LeftIcon,
    RightIcon,
    error,
    textAffix,
    textAffixStyle,
    editable = true,
    ...otherProps
  } = props;
  const [isFocused, setFocused] = useState(false);

  const isError = !isEmpty(error);
  return (
    <View style={fieldStyle}>
      {label && (
        <AppText
          style={[
            style.labelStyle,
            labelStyles,
            isError && style.errorLabel,
            // !editable && style.disabled,
          ]}
        >
          {label}
        </AppText>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <View
            style={[
              style.inputView,
              inputStyles,
              // isFocused && style.focused,

              !editable && style.disabled,
              isFocused && {
                borderColor: colors.primary,
              },
              isError && style.errorInput,
              !editable && style.disabledContainer,
            ]}
          >
            {LeftIcon && LeftIcon}
            {textAffix && (
              <AppText
                style={[
                  { color: colors.secondary, marginRight: 10, fontSize: 16 },
                  textAffixStyle,
                ]}
              >
                {textAffix}
              </AppText>
            )}
            <TextInput
              style={[
                style.inputField,
                !editable && style.disabledText,
                textInputStyle,
              ]}
              placeholder={placeholder}
              placeholderTextColor={colors.secondaryLight}
              onBlur={() => {
                onBlur();
                setFocused(false);
              }}
              onFocus={() => setFocused(true)}
              onChangeText={onChange}
              value={value}
              editable={editable}
              ref={ref}
              {...otherProps}
            />
            {RightIcon && RightIcon}
          </View>
        )}
      />
      {isError && <AppText style={style.errorText}>{error.message}</AppText>}
    </View>
  );
}

const styles = (colors: ColorsType) =>
  StyleSheet.create({
    inputView: {
      flexDirection: "row",
      width: "100%",
      borderWidth: 1,
      borderColor: colors.secondaryLight,
      borderRadius: 8,
      position: "relative",
      alignItems: "center",
      paddingHorizontal: 12,
      paddingVertical: 0,
      // height: 48,
    },
    labelStyle: {
      fontSize: 14,
      marginBottom: 4,
      color: colors.secondary,
      fontFamily: fontFamily[500],
    },
    inputField: {
      flex: 1,
      color: colors.secondaryDark,
      paddingVertical: 12,
      fontSize: 16,
    },
    focused: {
      color: colors.secondary,
    },
    errorInput: {
      borderColor: colors.danger,
      borderWidth: 1,
      color: colors.danger,
    },
    errorLabel: {
      color: colors.danger,
    },
    disabled: {
      color: colors.secondary,
      backgroundColor: colors.primaryLight,
    },
    disabledText: {
      color: colors.secondary,
    },
    disabledContainer: {
      backgroundColor: "#EAE2F5",
    },
    errorText: {
      color: colors.danger,
      fontSize: 12,
      fontFamily: fontFamily[500],
      marginTop: 4,
      marginLeft: 4,
      // textAlign: 'right',
    },
  });

export default TextInputController;
