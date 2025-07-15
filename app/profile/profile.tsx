import AppText from "@/components/AppText";
import BackButton from "@/components/back-button/index";
import { fontFamily } from "@/constants/fonts";
import { RootState } from "@/store";
import { getUserProfileApi } from "@/store/profileSection/ProfileSectionApi";
import { colors } from "@/utils/constants/colors";
import { useEffect } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { Text } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";

const ProfileSection = () => {
  const dispatch = useDispatch<any>();
  const {
    data: profile,
    loading,
    error,
  } = useSelector((state: RootState) => state.profile);

  useEffect(() => {
    dispatch(getUserProfileApi());
  }, []);

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>{error}</Text>;
  if (!profile) return <Text>No profile data found</Text>;
  return (
    <View style={styles.headerSection}>
      <ScrollView>
        <View style={styles.profileSection}>
          <BackButton />
        </View>
        <View style={{ marginTop: 20 }}>
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              <Image
                source={require("../../utils/images/driver-uniform.jpeg")}
                style={styles.profileImage}
              />
            </View>
            <View style={styles.detailBox}>
              <AppText style={styles.profileText}> PROFILE</AppText>
              <AppText style={styles.text}>{profile.name}</AppText>
              <AppText>{profile.email}</AppText>
              <AppText>+91 9876543210</AppText>
              <AppText style={styles.ID}>ID- {profile._id}</AppText>
            </View>
            <View style={styles.detailBox2}>
              <AppText style={styles.detailText}>HOSPITAL DETAILS</AppText>
              <AppText style={styles.text}>{profile.hospital.name}</AppText>
              <AppText>Hospital Code - {profile.hospital.code}</AppText>
              <AppText>Hospital Office - +91 9876543210</AppText>
              <AppText style={styles.ID}>{profile.hospital.address}</AppText>
            </View>
            <View style={styles.detailBox2}>
              <AppText style={styles.detailText}>VECHILE DETAILS</AppText>
              <AppText style={styles.text}>
                {profile.ambulanceID.rcNumber}
              </AppText>
              <AppText>{profile.ambulanceID.name}</AppText>
              <AppText>{profile.ambulanceID.vehicleType} </AppText>
              {/* <AppText>Oxygen Availability - Yes</AppText>
              <AppText>Defibrillator Equipped - Yes </AppText>
              <AppText style={styles.ID}>GPS Tracking ID - 8975418</AppText> */}
            </View>
            <View style={styles.detailBox3}>
              <AppText style={styles.warningText}>
                * For any personal information updates, please contact your
                registered hospital admin.
              </AppText>
              <AppText style={styles.warningText}>
                * You will be notified once a case is assigned. Please keep your
                app active and notifications on.
              </AppText>
              <AppText style={styles.warningText}>
                * Ensure location access is always enabled for accurate tracking
                and ETA updates.
              </AppText>
              <AppText style={styles.warningText}>
                * In case of app malfunction or emergency, immediately contact
                the control room or hospital admin
              </AppText>
              <AppText style={styles.warningText}>
                * For any personal information updates, please contact your
                registered hospital admin.
              </AppText>
              <AppText style={styles.warningText}>
                * Update each stage of the trip (Assigned, Departed, Arrived,
                Reached Hospital) promptly within the app
              </AppText>
              <AppText style={styles.warningText}>
                * Use the trip notes section to report any unusual delays,
                detours, or incidents during the trip.
              </AppText>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileSection;

const { width } = Dimensions.get("window");
const IMAGE_SIZE = 100;

const styles = StyleSheet.create({
  headerSection: {
    backgroundColor: colors.green[300],
    flex: 1,
  },
  profileSection: {
    height: 100,
    backgroundColor: colors.secondary,
  },
  container: {
    alignItems: "center",
    marginTop: -IMAGE_SIZE / 2,
    elevation: 5,
  },
  imageContainer: {
    zIndex: 2,
  },
  profileImage: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: IMAGE_SIZE / 2,
    borderWidth: 3,
    borderColor: colors.white,
  },
  detailBox: {
    marginTop: -IMAGE_SIZE / 2,
    width: width * 0.95,
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingTop: IMAGE_SIZE / 2 + 10,
    paddingBottom: 20,
    alignItems: "center",
    elevation: 5,
    zIndex: 1,
    gap: 5,
  },
  profileText: {
    fontSize: 20,
    fontFamily: fontFamily[600],
    color: colors.black,
  },
  ID: {
    color: colors.primary,
    marginHorizontal: 50,
    justifyContent: "center",
  },
  detailBox2: {
    marginTop: 5,
    width: width * 0.95,
    backgroundColor: colors.white,
    borderRadius: 12,
    alignItems: "center",
    elevation: 5,
    zIndex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    gap: 5,
  },
  detailText: {
    fontSize: 18,
    fontFamily: fontFamily[600],
  },
  text: {
    fontFamily: fontFamily[600],
  },
  warningText: {
    marginTop: 5,
    marginHorizontal: 15,
    fontFamily: fontFamily[500],
    gap: 10,
  },
  detailBox3: {
    marginTop: 5,
    width: width * 0.95,
    backgroundColor: colors.white,
    borderRadius: 12,
    alignItems: "center",
    elevation: 5,
    zIndex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    gap: 5,
    marginBottom: 50,
  },
});
