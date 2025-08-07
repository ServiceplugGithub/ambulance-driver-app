/* eslint-disable react-hooks/rules-of-hooks */
import { HOME } from "@/app/navigators/navigationConst";
import { navigate } from "@/app/navigators/Root";
import AppText from "@/components/AppText";
import BackButton from "@/components/back-button/index";
import StepDecisionModal from "@/components/Modal/steperModal";
import { fontFamily } from "@/constants/fonts";
import { RootState } from "@/store";
import { postCaseUpdateApi } from "@/store/caseUpdates/CaseUpdatesApi";
import { colors } from "@/utils/constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { useDispatch, useSelector } from "react-redux";

const data = {
  case_accepted_at: "2024-05-01T10:00:00",
  ambulance_assigned: "2024-05-01T10:05:00",
  ambulance_departed_for_patient_at: "2024-05-01T10:10:00",
  ambulance_arrived_at: "2024-05-01T10:15:00",
  ambulance_arrived_to_hospital_at: "2024-05-01T10:25:00",
};

const TrackingSection = () => {
  const assignedCase = useSelector(
    (state: RootState) => state.assignedCase.data
  );
  const patientLocation = useMemo(() => {
    if (!assignedCase?.caseDetails?.coordinates) return null;
    const [lat, lng] = assignedCase.caseDetails.coordinates
      .split(",")
      .map((val: string) => parseFloat(val.trim()));
    return { latitude: lat, longitude: lng };
  }, [assignedCase]);

  const [stepIndex, setStepIndex] = useState(0);
  const stepLabels = [
    "Leave Hospital",
    "Reached Pickup",
    "Patient Picked Up",
    "Reached Hospital",
    "Finish Case",
  ];
  const hospitalLocation = {
    latitude: 13.03,
    longitude: 77.57,
  };

  const destination = useMemo(() => {
    return stepLabels[stepIndex] === "Patient Picked Up"
      ? hospitalLocation
      : hospitalLocation;
  }, [stepIndex, hospitalLocation, patientLocation]);

  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const dispatch = useDispatch<any>();

  if (!assignedCase) return <AppText>No data found</AppText>;

  useEffect(() => {
    let subscription: Location.LocationSubscription;

    const startWatchingLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.warn("Location permission not granted");
        return;
      }

      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 10,
        },
        (location) => {
          setCurrentLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
        }
      );
    };

    startWatchingLocation();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  const stepEventsMap: { [key: string]: string } = {
    "Leave Hospital": "departed",
    "Reached Pickup": "reached_pickup",
    "Patient Picked Up": "picked_up",
    "Reached Hospital": "reached_hospital",
    "Finish Case": "case_finished",
  };

  const [list, setList] = useState("Leave Hospital");
  useEffect(() => {
    console.log(stepLabels[stepIndex], "dfghj0", stepIndex);
    setList(stepLabels[stepIndex]);
  }, [stepIndex]);

  const labels = [
    "Reported",
    "Assigned",
    "Departed",
    "Arrived at Location",
    "Reached Hospital",
  ];

  console.log(list, "<===List");

  const getCurrentStep = (data: any): number => {
    if (!data) return -1;
    if (data?.ambulance_arrived_to_hospital_at) return 4;
    if (data?.ambulance_arrived_at) return 3;
    if (data?.ambulance_departed_for_patient_at) return 2;
    if (data?.ambulance_assigned) return 1;
    if (data?.case_accepted_at) return 0;
    return -1;
  };

  const handleTerminate = async () => {
    const user = await AsyncStorage.getItem("userId");
    dispatch(
      postCaseUpdateApi({
        event: "case_terminated",
        userId: user,
        data: assignedCase,
      })
    );
  };

  const currentStep = useMemo(() => getCurrentStep(data), [data]);
  const [modalVisible, setModalVisible] = useState(false);

  // useEffect(() => {
  //   setList(labels[currentStep]);
  // }, [currentStep]);
  const [type, setType] = useState(true);
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
                latitude: currentLocation?.latitude ?? 13.03,
                longitude: currentLocation?.longitude ?? 77.57,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
              showsUserLocation={true}
            >
              {currentLocation && (
                <Marker
                  coordinate={currentLocation}
                  title="Ambulance"
                  description="Live location"
                  pinColor="blue"
                />
              )}

              {patientLocation && stepIndex < 2 && (
                <Marker
                  coordinate={patientLocation}
                  title="Patient"
                  pinColor="orange"
                />
              )}

              {stepIndex >= 2 && (
                <Marker
                  coordinate={hospitalLocation}
                  title="Hospital"
                  pinColor="red"
                />
              )}

              {currentLocation && destination && (
                <MapViewDirections
                  origin={currentLocation}
                  destination={destination}
                  apikey={"AIzaSyBFOfOMMomcMNMVEaI3EHNtNdcvvVMNvb4"}
                  strokeWidth={4}
                  strokeColor="blue"
                />
              )}
            </MapView>
          )}
        </View>
      </View>
      <ScrollView>
        <View style={styles.detailBox}>
          {/* <View style={styles.stepContainer}> */}
          {/* <StepTracker
              currentStep={currentStep}
              labels={stepLabels}
              onGoing={false}
            /> */}
          {/* </View> */}

          <View style={styles.innerBox}>
            <AppText style={styles.headerText}>Trip Details</AppText>
            <AppText style={styles.addText}>
              {assignedCase.caseDetails?.location}
            </AppText>
            <AppText style={styles.addText}>
              Incident Type: {assignedCase.caseDetails?.incidentType}
            </AppText>
            <AppText style={styles.addText}>
              Distance: {assignedCase.distance} Duration:{" "}
              {assignedCase.duration}
            </AppText>
          </View>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
              setType(false);
            }}
          >
            <View style={styles.button}>
              <AppText style={styles.buttonText}>{list}</AppText>
            </View>
          </TouchableOpacity>
          {list !== "Finish Case" && (
            <TouchableOpacity
              onPress={() => {
                // setModalVisible(true);
                // setType(false);
                handleTerminate();
                setStepIndex(0);
                setList(stepLabels[0]);
                navigate(HOME);
              }}
            >
              <View style={styles.button2}>
                <AppText style={styles.buttonText}>Cancel Trip</AppText>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
      <StepDecisionModal
        visible={modalVisible}
        onAccept={() => {
          const startAceept = 0;
          const currentLabel = stepLabels[stepIndex];
          const event = stepEventsMap[currentLabel];
          console.log(event, "Triggered Event");
          console.log(currentLabel, "Current Label");

          if (event && assignedCase) {
            const user = AsyncStorage.getItem("userId");
            dispatch(
              postCaseUpdateApi({
                event,
                userId: user,
                data: assignedCase,
              })
            );
          }

          const nextStepIndex = stepIndex + 1;
          const nextStepLabel = stepLabels[nextStepIndex];

          if (currentLabel === "Finish Case") {
            setStepIndex(0);
            setList(stepLabels[0]);
            navigate(HOME);
          } else {
            setStepIndex((prev) => prev + 1);
            setList(stepLabels[stepIndex + 1]);
          }

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
    backgroundColor: colors.white,
    flex: 1,
  },
  profileSection: {
    height: 50,
    backgroundColor: colors.secondary,
    marginBottom: 25,
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
