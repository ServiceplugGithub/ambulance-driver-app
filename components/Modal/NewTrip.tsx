import { navigate } from "@/app/navigators/Root";
import { TRACKING } from "@/app/navigators/navigationConst";
import { fontFamily } from "@/constants/fonts";
import { postCaseUpdateApi } from "@/store/caseUpdates/CaseUpdatesApi";
import { colors } from "@/utils/constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from "expo-av";
import React, { useEffect, useRef } from "react";
import {
  Modal,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { useDispatch } from "react-redux";
import AppText from "../AppText";

interface TripDecisionModalProps {
  visible: boolean;
  onAccept: () => void;
  onDecline: () => void;
  onClose: () => void;
  data: any;
}

const TripDecisionModal: React.FC<TripDecisionModalProps> = ({
  visible,
  onAccept,
  onDecline,
  onClose,
  data,
}) => {
  const dispatch = useDispatch<any>();

  const soundRef = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    const playSound = async () => {
      if (!visible) return;

      const { sound } = await Audio.Sound.createAsync(
        require("../../utils/ringtone/fire_alarm.mp3"),
        {
          isLooping: true,
          shouldPlay: true,
        }
      );
      soundRef.current = sound;
      await sound.playAsync();
    };

    playSound();

    return () => {
      if (soundRef.current) {
        soundRef.current.stopAsync();
        soundRef.current.unloadAsync();
      }
    };
  }, [visible]);

  const stopSound = async () => {
    if (soundRef.current) {
      await soundRef.current.stopAsync();
      await soundRef.current.unloadAsync();
      soundRef.current = null;
    }
  };

  const handleAccept = async () => {
    await stopSound();
    const user = await AsyncStorage.getItem("userId");
    onAccept();
    navigate(TRACKING);
    dispatch(
      postCaseUpdateApi({
        event: "ambulance accepted",
        userId: user,
        data: data,
      })
    );
  };
  const handleDecline = async () => {
    await stopSound();
    const user = await AsyncStorage.getItem("userId");
    onDecline();
    dispatch(
      postCaseUpdateApi({
        event: "ambulance rejected",
        userId: user,
        data: data,
      })
    );
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
          <AppText style={styles.title}>New Trip Request</AppText>
          <View style={styles.caseDetailsBox}>
            <AppText style={styles.caseText}>
              #{data.caseDetails?.caseID}
            </AppText>
            <AppText style={styles.caseDialog}>
              Incident Type: {data.caseDetails?.incidentType}
            </AppText>
            <AppText style={styles.caseDialog}>
              Location: {data.caseDetails?.location}
            </AppText>
            <AppText style={styles.caseDialog}>
              Distance: {data.distance} Duration: {data.duration}
            </AppText>
          </View>
          <AppText style={styles.subtitle}>
            Do you want to accept the trip?
          </AppText>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.declineBtn} onPress={handleDecline}>
              <AppText style={styles.btnText}>Decline</AppText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.acceptBtn} onPress={handleAccept}>
              <AppText style={styles.btnText}>Accept</AppText>
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
  caseDetailsBox: {
    backgroundColor: colors.white,
    elevation: 5,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  } as ViewStyle,
  caseText: {
    fontFamily: fontFamily[600],
    fontSize: 12,
    color: colors.gray[500],
  } as TextStyle,
  caseDialog: {
    fontFamily: fontFamily[700],
  } as TextStyle,
});
