import { fontFamily } from "@/constants/fonts";
import { colors } from "@/utils/constants/colors";
import React from "react";
import { StyleSheet, View } from "react-native";

interface HeaderSectionProps {
  goBack?: () => void;
  title?: string;
  reset?: boolean;
  resetfield?: () => void;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({
  goBack,
  title,
  reset,
  resetfield,
}) => {
  return <View style={styles.container}></View>;
};

export default HeaderSection;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 12,
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 20,
    elevation: 3,
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  textSection: {
    color: colors.white,
    fontSize: 18,
    fontFamily: fontFamily[500],
  },
  resetbutton: {
    paddingRight: 20,
  },
  profileSection: {
    marginTop: 0,
    alignSelf: "flex-start",
  },
});
