import AppText from "@/components/AppText";
import BackButton from "@/components/back-button/index";
import StepDecisionModal from "@/components/Modal/steperModal";
import StepTracker from "@/components/step-indicator";
import { fontFamily } from "@/constants/fonts";
import { colors } from "@/utils/constants/colors";
import * as Location from "expo-location";
import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

const data = {
  case_accepted_at: "2024-05-01T10:00:00",
  ambulance_assigned: "2024-05-01T10:05:00",
  ambulance_departed_for_patient_at: "2024-05-01T10:10:00",
  ambulance_arrived_at: "2024-05-01T10:15:00",
  ambulance_arrived_to_hospital_at: "2024-05-01T10:25:00",
};

const TrackingSection = () => {
  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    const getLiveLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.warn("Location permission not granted");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    };

    getLiveLocation();
  }, []);

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
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setList(labels[currentStep]);
  }, [currentStep]);

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <BackButton />
      </View>
      <View>
        <View style={styles.mapSection}>
          <AppText style={styles.headerText}>Location</AppText>
          {currentLocation && (
            <MapView
              style={styles.map}
              region={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
              showsUserLocation={true}
            >
              <Marker
                coordinate={currentLocation}
                title="Ambulance"
                description="Your current location"
              />
            </MapView>
          )}
        </View>
      </View>
      <ScrollView>
        <View style={styles.detailBox}>
          <View style={styles.stepContainer}>
            <StepTracker
              currentStep={currentStep}
              labels={stepLabels}
              onGoing={false}
            />
          </View>

          <View style={styles.innerBox}>
            <AppText style={styles.headerText}>Trip Details</AppText>
            <AppText style={styles.addText}>
              404, P&T Colony, RT Nager, Karnataka - 500081
            </AppText>
            <AppText style={styles.addText}>Patents - 2</AppText>
            <AppText style={styles.addText}>ETA - 4 min</AppText>
          </View>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <View style={styles.button}>
              <AppText style={styles.buttonText}>{list}</AppText>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <View style={styles.button2}>
              <AppText style={styles.buttonText}>Cancel Trip</AppText>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <StepDecisionModal
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
  );
};

export default TrackingSection;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.green[300],
    flex: 1,
  },
  profileSection: {
    height: 100,
    backgroundColor: colors.secondary,
  },
  mapSection: {
    marginTop: 10,
    backgroundColor: colors.white,
    padding: 10,
    margin: 10,
    borderRadius: 10,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 350,
    borderRadius: 10,
  },
  stepContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  detailBox: {
    elevation: 5,
    margin: 10,
    backgroundColor: colors.white,
    borderRadius: 10,
  },
  headerText: {
    fontSize: 18,
    fontFamily: fontFamily[600],
    paddingHorizontal: 10,
  },
  innerBox: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  button: {
    backgroundColor: colors.primary,
    marginBottom: 25,
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: colors.white,
    fontFamily: fontFamily[700],
    fontSize: 16,
  },
  button2: {
    backgroundColor: colors.red[500],
    marginBottom: 25,
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  addText: {
    paddingHorizontal: 10,
  },
  map: {
    width: "100%",
    height: 350,
    borderRadius: 10,
  },
});
