import { fontFamily } from "@/constants/fonts";
import { colors } from "@/utils/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import StepIndicator from "react-native-step-indicator";
import AppText from "../AppText";

interface StepTracker {
  currentStep: number;
  labels: string[];
  onGoing: boolean;
}

const StepTracker: React.FC<StepTracker> = ({
  currentStep,
  labels,
  onGoing,
}) => {
  const stepIndicatorStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 4,
    currentStepStrokeWidth: 2,
    stepStrokeCurrentColor: colors.emerald,
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: colors.emerald,
    stepStrokeUnFinishedColor: "#aaaaaa",
    separatorFinishedColor: colors.emerald,
    separatorUnFinishedColor: "#aaaaaa",
    stepIndicatorFinishedColor: colors.emerald,
    stepIndicatorUnFinishedColor: "#ffffff",
    stepIndicatorCurrentColor: colors.emerald,
    stepIndicatorLabelFontSize: 1,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: colors.emerald,
    stepIndicatorLabelFinishedColor: "#ffffff",
    stepIndicatorLabelUnFinishedColor: "#aaaaaa",
    labelColor: "#999999",
    labelAlign: "flex-start" as const,
    labelSize: 13,
    currentStepLabelColor: colors.emerald,
    labelFontFamily: fontFamily[700],
  };

  return (
    <>
      <View style={styles.step}>
        {onGoing && <AppText style={styles.stepText}>Ongoing Trip</AppText>}
        <View style={styles.contanier}>
          <StepIndicator
            customStyles={stepIndicatorStyles}
            currentPosition={currentStep}
            direction="horizontal"
            labels={labels}
          />
        </View>
        {onGoing && (
          <TouchableOpacity
            style={styles.stepButton}
            onPress={() => router.navigate({ pathname: "/tracking/tracking" })}
          >
            <Ionicons
              color={colors.white}
              name="arrow-forward"
              size={20}
              style={styles.icon}
            />
            <AppText style={styles.stepButtonText}>Check</AppText>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

export default StepTracker;

const styles = StyleSheet.create({
  contanier: {
    padding: 5,
    marginTop: 5,
    // paddingBottom: 15,
    borderRadius: 10,
  },
  step: {
    backgroundColor: colors.white,
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    elevation: 5,
  },
  stepText: {
    paddingLeft: 10,
    marginTop: 10,
    fontSize: 20,
    fontFamily: fontFamily[600],
  },
  stepButton: {
    backgroundColor: colors.primary,
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 5,
    borderRadius: 10,
    elevation: 5,
    flexDirection: "row-reverse",
    gap: 5,
    justifyContent: "center",
  },
  stepButtonText: {
    color: colors.white,
    fontFamily: fontFamily[600],
    fontSize: 16,
  },
  top: {
    backgroundColor: colors.white,
  },
  icon: {
    marginTop: 2,
  },
});
