import { colors } from "@/utils/constants/colors";
import React from "react";
import {
  Modal,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import AppText from "../AppText";

interface StepDecisionModalProps {
  visible: boolean;
  onAccept: () => void;
  onDecline: () => void;
  onClose: () => void;
}

const StepDecisionModal: React.FC<StepDecisionModalProps> = ({
  visible,
  onAccept,
  onDecline,
  onClose,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          <AppText style={styles.subtitle}>
            Do you want to change the status?
          </AppText>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.declineBtn} onPress={onDecline}>
              <AppText style={styles.btnText}>Decline</AppText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.acceptBtn} onPress={onAccept}>
              <AppText style={styles.btnText}>Accept</AppText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default StepDecisionModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  } as ViewStyle,
  modalBox: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
  } as ViewStyle,
  subtitle: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  } as TextStyle,
  buttonRow: {
    flexDirection: "row",
    gap: 12,
  } as ViewStyle,
  acceptBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  } as ViewStyle,
  declineBtn: {
    backgroundColor: colors.red[500],
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  } as ViewStyle,
  btnText: {
    color: "white",
    fontWeight: "600",
  } as TextStyle,
});
