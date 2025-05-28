/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export type ColorsType = typeof Colors.light & typeof Colors.dark;

const commonColors = {
  white: "#fff",
  danger: '#FF5A5F',
  black: '#000',
};

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    primary: "#1FCC79",
    primaryLight: '#4DE2A3',
    primaryBg: "#beedcf",
    secondary: "#2E3E5C",
    secondaryLight: "#9FA5C0",
    secondaryDark: '#333',
    disableBg: "#E0E0E0",
    secondaryText: '#9FA5C0',


    ...commonColors,
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    primary: "#1FCC79",
    primaryLight: '#4DE2A3',
    primaryBg: "#beedcf",
    secondary: "#2E3E5C",
    secondaryLight: "#9FA5C0",
    secondaryDark: '#333',
    disableBg: "#E0E0E0",
    secondaryText: '#9FA5C0',


    ...commonColors,
  },
};
