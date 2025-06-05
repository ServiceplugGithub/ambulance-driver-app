import { colors } from "@/utils/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, ImageStyle, StyleSheet, View } from "react-native";
import { IconButton } from "react-native-paper";

const BackButton: React.FC = () => {
  return (
    <View style={styles.container}>
      <IconButton
        onPress={() => router.navigate("/home/home")}
        icon={() => (
          <Ionicons color={colors.white} name="arrow-back" size={30} />
        )}
      />
      <Image
        source={require("../../utils/images/Group_134.jpg")}
        style={styles.image}
      />
    </View>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 42,
    marginHorizontal: 5,
    justifyContent: "space-between",
  },
  image: {
    marginTop: 12,
    marginRight: 15,
  } as ImageStyle,
});
