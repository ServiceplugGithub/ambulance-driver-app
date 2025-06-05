import { colors } from "@/utils/constants/colors";
import { router } from "expo-router";
import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

interface TripDecisionModalProps {
  visible: boolean;
  onAccept: () => void;
  onDecline: () => void;
  onClose: () => void;
}

const TripDecisionModal: React.FC<TripDecisionModalProps> = ({
  visible,
  onAccept,
  onDecline,
  onClose,
}) => {
  const handleAccept = () => {
    onAccept();
    router.navigate("/screens/tracking");
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          <Text style={styles.title}>New Trip Request</Text>
          <Text style={styles.subtitle}>Do you want to accept the trip?</Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.declineBtn} onPress={onDecline}>
              <Text style={styles.btnText}>Decline</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.acceptBtn} onPress={handleAccept}>
              <Text style={styles.btnText}>Accept</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default TripDecisionModal;

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
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
  } as TextStyle,
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
