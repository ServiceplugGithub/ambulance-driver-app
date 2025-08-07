/* eslint-disable react/no-unescaped-entities */
import React = require("react");
import { fontFamily } from "@/constants/fonts";
import { Image, StyleSheet, View } from "react-native";
import AppText from "../AppText";

export default function NoInternetScreen() {
  return (
    <>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("@/assets/images/noInternetConnection.png")}
        />
      </View>

      <View style={styles.textContainer}>
        <AppText style={styles.title}>No Internet Connection</AppText>
        <AppText style={styles.subtitle}>
          Oops! Looks like you're offline
        </AppText>
        <AppText style={styles.message}>
          Please check your connection and try again
        </AppText>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    marginBottom: 32,
    alignItems: "center",
  },
  image: {
    width: 500,
    height: 280,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 32,
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontFamily: fontFamily[700],
    color: "#1E293B",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    fontFamily: fontFamily[600],
    color: "#475569",
    marginBottom: 12,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    fontFamily: fontFamily[400],
    color: "#64748B",
    textAlign: "center",
    lineHeight: 24,
    maxWidth: 300,
  },
});
