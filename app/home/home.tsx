/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-native/no-color-literals */
import AppText from "@/components/AppText";
import WeeklyReportChart from "@/components/bar-chart/index";
import HeaderSection from "@/components/Header";
import { startLiveLocationTracking } from "@/components/live-tracker";
import TripDecisionModal from "@/components/Modal/NewTrip";
import StepTracker from "@/components/step-indicator";
import TripLogsSection from "@/components/trip-logs/index";
import { RootState } from "@/store";
import { setAssignedCase } from "@/store/assignedCaseData";
import { getReportedCasesApi } from "@/store/caseReported/CaseReportedApi";
import { startBackgroundLocation } from "@/store/location/Location";
import { changeVehicleAvailabilityApi } from "@/store/toogleButton/ToogleButtonApi";
import { getDeviceId } from "@/utils/config";
import { colors } from "@/utils/constants/colors";
import { createSocket } from "@/utils/socket/socket";
import { getStorage } from "@/utils/storage";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from "react-native";
import { IconButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { Socket } from "socket.io-client";

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
  const socketRef = useRef<Socket | null>(null);
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

  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const assignedCase = useSelector(
    (state: RootState) => state.assignedCase.data
  );
  const { cases, loading, error } = useSelector(
    (state: any) => state.reportedCases
  );

  const [stepTrackers, setStepTracker] = useState(false);

  const stepTracker = () => {
    if (assignedCase?.active) {
      // const lastEvent = cases?.[0]?.events?.[cases[0].events.length - 1]?.event;
      // const isActiveCase =
      //   lastEvent !== "case finished" && lastEvent !== "case terminated";
      setStepTracker(true);
    } else {
      setStepTracker(false);
    }
  };

  useEffect(() => {
    stepTracker();
  }, [assignedCase, cases]);

  useEffect(() => {
    dispatch(getReportedCasesApi());
  }, []);

  const [modalData, setModalData] = useState("");
  const [onGoing, setOnGoing] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const setupSocket = async () => {
      const newSocket = await createSocket();
      socketRef.current = newSocket;

      newSocket.on("connect", () => {
        console.log("✅ Connected with ID:", newSocket.id);
        newSocket.emit("register", {
          type: "driver",
          id: "6853f0bf2fd5e36814c9cb5f",
        });

        startLiveLocationTracking(newSocket, setCurrentLocation);
        startBackgroundLocation(newSocket);
      });

      newSocket.on("disconnect", () => {
        console.log("Disconnected");
      });

      newSocket.off("case_assigned");
      newSocket.on("case_assigned", (data) => {
        // console.log("New Case Assigned:", data);
        if (!isMounted) return;
        setModalVisible(true);
        setModalData(data);
        dispatch(setAssignedCase(data));
        setOnGoing(true);
      });
    };

    setupSocket();

    return () => {
      isMounted = false;
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  const [modalVisible, setModalVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    const updateStatus = async () => {
      const deviceId = await getDeviceId();
      await dispatch(
        changeVehicleAvailabilityApi({
          driverId: "6853f0bf2fd5e36814c9cb5f",
          status: isEnabled,
        })
      );
    };

    updateStatus();
  }, [isEnabled]);

  useEffect(() => {
    const updateStatus = async () => {
      const token = await AsyncStorage.getItem("token");
      console.log(token);
    };
    updateStatus();
  }, []);

  const fullResponse = useSelector(
    (state: RootState) => state.login.rawResponse
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const locationString = await getStorage("user_location_info");

        if (typeof locationString === "string") {
          const location = JSON.parse(locationString);
          console.log("Stored Location:", location);
        } else {
          console.warn("No valid location string found:", locationString);
        }
      } catch (err) {
        console.error("Failed to fetch stored location:", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (fullResponse.user.status === "active") {
      setIsEnabled(true);
    } else setIsEnabled(false);
  }, [fullResponse]);

  console.log(fullResponse, "kjhgf");
  if (loading) return <AppText>Loading...</AppText>;
  if (error) return <AppText>{error}</AppText>;
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
              onPress={() => router.push({ pathname: "/profile/profile" })}
              icon={() => (
                <Ionicons color={colors.white} name="person-circle" size={43} />
              )}
            />
          </View>
        </View>
        <WeeklyReportChart data={cases} />
        {onGoing && (
          <StepTracker
            currentStep={currentStep}
            labels={stepLabels}
            onGoing={true}
          />
        )}
        <TripLogsSection logs={cases} />
        <TripDecisionModal
          data={modalData}
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
