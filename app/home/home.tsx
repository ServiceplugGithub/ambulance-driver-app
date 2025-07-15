/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-native/no-color-literals */
import WeeklyReportChart from "@/components/bar-chart/index";
import HeaderSection from "@/components/Header";
import TripDecisionModal from "@/components/Modal/NewTrip";
import StepTracker from "@/components/step-indicator";
import TripLogsSection from "@/components/trip-logs/index";
import { changeVehicleAvailabilityApi } from "@/store/toogleButton/ToogleButtonApi";
import { getDeviceId } from "@/utils/config";
import { colors } from "@/utils/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from "react-native";
import { IconButton } from "react-native-paper";
import { useDispatch } from "react-redux";

const screenWidth = Dimensions.get("window").width;
const data = {
  case_accepted_at: "2024-05-01T10:00:00",
  ambulance_assigned: "2024-05-01T10:05:00",
  ambulance_departed_for_patient_at: "2024-05-01T10:10:00",
  ambulance_arrived_at: "2024-05-01T10:15:00",
  ambulance_arrived_to_hospital_at: "2024-05-01T10:25:00",
};

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
  const stepLabels = useMemo(
    () => [
      "Reported",
      "Assigned",
      "Departed",
      "Arrived at Location",
      "Reached Hospital",
    ],
    []
  );

  const [list, setList] = useState("");

  const labels = [
    "Reported",
    "Assigned",
    "Departed",
    "Arrived at Location",
    "Reached Hospital",
  ];

  const getCurrentStep = (data: any): number => {
    if (!data) return -1;
    if (data?.ambulance_arrived_to_hospital_at) return 4;
    if (data?.ambulance_arrived_at) return 3;
    if (data?.ambulance_departed_for_patient_at) return 2;
    if (data?.ambulance_assigned) return 1;
    if (data?.case_accepted_at) return 0;
    return -1;
  };

  const currentStep = useMemo(() => getCurrentStep(data), [data]);
  const Today = 4;
  const Total = 28;

  const logs = [
    {
      id: 1,
      timestamp: "May 22, 2025 | 14:42",
      address: "RT Nagar, Karnataka 500081",
      patients: 2,
      duration: "18 min",
      status: "COMPLETED",
      caseId: 87524446845223668,
    },
    {
      id: 2,
      timestamp: "May 23, 2025 | 13:10",
      address: "MG Road, Karnataka 500078",
      patients: 1,
      status: "CANCELLED",
      caseId: 76855445586823412,
    },
    {
      id: 3,
      timestamp: "May 28, 2025 | 19:30",
      address: "Indiranagar, Karnataka 500082",
      patients: 3,
      duration: "25 min",
      status: "COMPLETED",
      caseId: 67235466452311234,
    },
    {
      id: 4,
      timestamp: "May 25, 2025 | 18:30",
      address: "Indiranagar, Karnataka 500082",
      patients: 3,
      status: "CANCELLED",
      caseId: 67235466452311234,
    },
    {
      id: 5,
      timestamp: "May 31, 2025 | 21:30",
      address: "Indiranagar, Karnataka 500082",
      patients: 3,
      duration: "20 min",
      status: "COMPLETED",
      caseId: 67235466452311234,
    },
  ];

  const [modalVisible, setModalVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    const updateStatus = async () => {
      const deviceId = await getDeviceId();
      await dispatch(
        changeVehicleAvailabilityApi({
          driverId: deviceId,
          status: isEnabled,
        })
      );
    };

    updateStatus();
  }, [isEnabled]);

  return (
    <>
      <View style={styles.container}>
        <HeaderSection title="p" />
        <View style={styles.innerContainer}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image
              style={styles.Sp}
              source={require("../../utils/images/Group_134.jpg")}
            />
          </TouchableOpacity>
          <Switch
            value={isEnabled}
            onValueChange={setIsEnabled}
            trackColor={{ false: "#767577", true: `${colors.primary}80` }}
            thumbColor={isEnabled ? colors.primary : "#f4f3f4"}
            style={styles.toggle}
          />
          <View style={styles.profileSection}>
            <IconButton
              onPress={() => router.navigate({ pathname: "/profile/profile" })}
              icon={() => (
                <Ionicons color={colors.white} name="person-circle" size={43} />
              )}
            />
          </View>
        </View>
        <WeeklyReportChart
          todayTrips={Today}
          totalTrips={Total}
          data={[4, 6, 3, 5, 2, 7, 1]}
        />
        <StepTracker
          currentStep={currentStep}
          labels={stepLabels}
          onGoing={true}
        />
        <TripLogsSection logs={logs} />
        <TripDecisionModal
          visible={modalVisible}
          onAccept={() => {
            setModalVisible(false);
          }}
          onDecline={() => {
            setModalVisible(false);
          }}
          onClose={() => setModalVisible(false)}
        />
      </View>
    </>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.green[300],
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.secondary,
  },
  profileSection: {
    padding: 5,
  },
  Sp: {
    marginHorizontal: 10,
    marginTop: 18,
  },
  toggle: {
    paddingHorizontal: 60,
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
    paddingVertical: 5,
  },
});
