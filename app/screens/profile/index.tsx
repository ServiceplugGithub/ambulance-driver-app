import AppText from "@/components/AppText";
import BackButton from "@/components/back-button/index";
import { RootState } from "@/store";
import { getUserProfileApi } from "@/store/profileSection/ProfileSectionApi";
import { colors } from "@/utils/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

const IMAGE_SIZE = 120;

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

  if (loading) return <ActivityIndicator style={styles.loadingIndicator} />;
  if (error) return <Text style={styles.errorText}>{error}</Text>;
  if (!profile)
    return <AppText style={styles.errorText}>No profile data found</AppText>;

  return (
    <View style={styles.container}>
      <BackButton />

      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
          <Image
            source={require('@/assets/images/driver-uniform.jpeg')}
            style={styles.profileImage}
          />
        </View>
        <AppText style={styles.profileName}>{profile.name}</AppText>
        <AppText style={styles.profileId}>ID: {profile._id}</AppText>
      </View>
      <ScrollView contentContainerStyle={styles.detailsContent}>
        <AppText style={styles.sectionHeader}>Personal Details</AppText>
        <View style={styles.detailRow}>
          <Ionicons
            name="person-outline"
            size={20}
            color={colors.gray[600]}
            style={styles.icon}
          />
          <AppText style={styles.detailText}>{profile.email}</AppText>
        </View>
        <View style={styles.detailRow}>
          <Ionicons
            name="call-outline"
            size={20}
            color={colors.gray[600]}
            style={styles.icon}
          />
          <AppText style={styles.detailText}>+91 9876543210</AppText>
        </View>

        {/* Hospital Details */}
        <AppText style={styles.sectionHeader}>Hospital Details</AppText>
        <View style={styles.detailRow}>
          <Ionicons
            name="medical-outline"
            size={20}
            color={colors.gray[600]}
            style={styles.icon}
          />
          <AppText style={styles.detailTitle}>{profile.hospital.name}</AppText>
        </View>
        <View style={styles.detailRow}>
          <Ionicons
            name="code-outline"
            size={20}
            color={colors.gray[600]}
            style={styles.icon}
          />
          <AppText style={styles.detailText}>
            Hospital Code - {profile.hospital.code}
          </AppText>
        </View>
        <View style={styles.detailRow}>
          <Ionicons
            name="location-outline"
            size={20}
            color={colors.gray[600]}
            style={styles.icon}
          />
          <AppText style={styles.detailText}>
            {profile.hospital.address}
          </AppText>
        </View>

        {/* Vehicle Details */}
        <AppText style={styles.sectionHeader}>Vehicle Details</AppText>
        <View style={styles.detailRow}>
          <Ionicons
            name="car-outline"
            size={20}
            color={colors.gray[600]}
            style={styles.icon}
          />
          <AppText style={styles.detailTitle}>
            {profile.ambulanceID.name}
          </AppText>
        </View>
        <View style={styles.detailRow}>
          <Ionicons
            name="document-text-outline"
            size={20}
            color={colors.gray[600]}
            style={styles.icon}
          />
          <AppText style={styles.detailText}>
            Registration No - {profile.ambulanceID.rcNumber}
          </AppText>
        </View>
        <View style={styles.detailRow}>
          <Ionicons
            name="shield-checkmark-outline"
            size={20}
            color={colors.gray[600]}
            style={styles.icon}
          />
          <AppText style={styles.detailText}>
            Vehicle Type - {profile.ambulanceID.vehicleType}
          </AppText>
        </View>

        {/* Important Information */}
        <View style={styles.warningBox}>
          <AppText style={styles.warningTitle}>Important Information</AppText>
          <AppText style={styles.warningText}>
            * For any personal information updates, please contact your
            registered hospital admin.
          </AppText>
          <AppText style={styles.warningText}>
            * You will be notified once a case is assigned. Please keep your app
            active and notifications on.
          </AppText>
          <AppText style={styles.warningText}>
            * Ensure location access is always enabled for accurate tracking and
            ETA updates.
          </AppText>
          <AppText style={styles.warningText}>
            * In case of app malfunction or emergency, immediately contact the
            control room or hospital admin.
          </AppText>
          <AppText style={styles.warningText}>
            * Update each stage of the trip (Assigned, Departed, Arrived,
            Reached Hospital) promptly within the app.
          </AppText>
          <AppText style={styles.warningText}>
            * Use the trip notes section to report any unusual delays, detours,
            or incidents during the trip.
          </AppText>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileSection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    backgroundColor: colors.secondary,
    // paddingTop: 50,
    paddingBottom: 20,
    alignItems: "center",
  },
  profileImageContainer: {
    marginBottom: 10,
  },
  profileImage: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: IMAGE_SIZE / 2,
    borderWidth: 3,
    borderColor: colors.white,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.white,
    marginBottom: 4,
  },
  profileId: {
    fontSize: 16,
    color: colors.gray[200],
  },
  detailsContent: {
    padding: 16,
    paddingTop: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.gray[800],
    marginTop: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[300],
    paddingBottom: 5,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    marginHorizontal: 8,
    borderBottomColor: colors.gray[200],
  },
  icon: {
    marginRight: 10,
    width: 20,
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  detailText: {
    fontSize: 16,
    color: colors.gray[600],
  },
  warningBox: {
    backgroundColor: colors.gray[100],
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    marginBottom: 50,
  },
  warningTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.red[500],
    marginBottom: 10,
  },
  warningText: {
    fontSize: 12,
    color: colors.gray[600],
    marginBottom: 8,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    flex: 1,
    textAlign: "center",
    marginTop: 50,
  },
});
