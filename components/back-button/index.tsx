import { colors } from "@/utils/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { ImageStyle, StyleSheet, View } from "react-native";
import { IconButton } from "react-native-paper";

const BackButton = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <IconButton
          onPress={() => navigation.goBack()}
          icon={() => (
            <Ionicons color={colors.white} name="arrow-back" size={30} />
          )}
        />
        {/* <Image
          source={require("../../utils/images/Group_134.jpg")}
          style={styles.image}
        /> */}
      </View>
    </View>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // marginHorizontal: 5,
    justifyContent: "space-between",
    backgroundColor: colors.secondary,
  },
  image: {
    marginTop: 12,
    marginRight: 15,
  } as ImageStyle,
  innerContainer: {
    marginTop: 8,
    flexDirection: "row",
    gap: 220,
  },
});
