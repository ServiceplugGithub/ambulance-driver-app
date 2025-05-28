import React, { JSX } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

import { ColorsType } from '@/constants/colors';
import { fontFamily } from '@/constants/fonts';
import { ButtonVariant } from '@/enums/button-variant.enum';
import { useThemeColor } from '@/hooks/useThemeColor';
import AppText from '../AppText';
import AppTouchableOpacity from '../AppTouchableOpacity';

type BtnProps = {
  label: string;
  variant?: ButtonVariant
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  containerStyle?: object,
  LeftIcon?: JSX.Element;
  RightIcon?: JSX.Element;
  labelStyle?: object;

}

const Loader = ({ color }: { color: string }) => <ActivityIndicator color={color} />;

function CustomButton(props: BtnProps) {
  const { label, variant = ButtonVariant.contained, disabled = false, loading = false, containerStyle, onPress, LeftIcon, RightIcon, labelStyle } = props;
  const color: ColorsType = useThemeColor() as ColorsType;

  const style = styles(color);


  const containedBtn = () => (
    <AppTouchableOpacity onPress={onPress} style={[style.btnContainer, style.containedBtnContainer, containerStyle, disabled && { backgroundColor: color.disableBg }]} disabled={disabled || loading}>
      {loading ? <Loader color={color.white} /> :
        <>
          {LeftIcon && LeftIcon}
          <AppText style={[style.label, labelStyle]}>{label}</AppText>
          {RightIcon && RightIcon}

        </>
      }
    </AppTouchableOpacity>
  );


  const textBtn = () => (
    <AppTouchableOpacity onPress={onPress} style={[style.txtBtnContainer, containerStyle]} disabled={disabled || loading}>
      {loading ? <Loader color={color.primary} /> :
        <>
          {LeftIcon && LeftIcon}
          <AppText style={[style.textLabel, labelStyle, disabled && style.disabledText]}>{label}</AppText>
          {RightIcon && RightIcon}
        </>
      }
    </AppTouchableOpacity>
  )

  const outlinedBtn = () => (
    <AppTouchableOpacity onPress={onPress} style={[style.btnContainer, style.outlineBtnContainer, containerStyle]} disabled={disabled || loading}>
      {loading ? <Loader color={color.primary} /> :
        <>
          {LeftIcon && LeftIcon}
          <AppText style={[style.textLabel, labelStyle, disabled && style.disabledText]}>{label}</AppText>
          {RightIcon && RightIcon}
        </>
      }
    </AppTouchableOpacity>
  )

  switch (variant) {
    case ButtonVariant.contained:
      return containedBtn();

    case ButtonVariant.outlined:
      return outlinedBtn();

    case ButtonVariant.text:
      return textBtn()


    default:
      return containedBtn()
  }

}

export default CustomButton;

const styles = (colors: ColorsType) => StyleSheet.create({
  containedBtnContainer: {
    padding: 16,
    backgroundColor: colors.primary,
  },
  btnContainer: {
    // width: '100%',
    borderRadius: 4,
    padding: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8
  },
  outlineBtnContainer: {
    // width: '100%',

    borderWidth: 1,
    borderColor: colors.primary,
    padding: 8
  },
  txtBtnContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  label: {
    fontFamily: fontFamily[500],
    fontSize: 16,
    color: colors.white,
  },
  textLabel: {
    fontFamily: fontFamily[500],
    color: colors.primary,
  },
  disabledText: {
    color: colors.secondaryText
  }
});
