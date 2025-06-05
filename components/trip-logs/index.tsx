// components/TripLogsSection.tsx
import { fontFamily } from "@/constants/fonts";
import { colors } from "@/utils/constants/colors";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import AppText from "../AppText";

interface LogItem {
  id: number;
  timestamp: string;
  address: string;
  patients: number;
  duration?: string;
  status: string;
  caseId: number;
}

interface TripLogsSectionProps {
  logs: LogItem[];
}

const TripLogsSection: React.FC<TripLogsSectionProps> = ({ logs }) => {
  return (
    <View style={styles.listBox}>
      <View style={styles.listHeader}>
        <AppText style={styles.headerText}>Details</AppText>
      </View>
      <ScrollView>
        {logs.map((log) => (
          <View key={log.id} style={styles.logItem}>
            <AppText style={styles.case}>#{log.caseId}</AppText>
            <AppText style={styles.date}>{log.timestamp}</AppText>
            <AppText>
              Trip to {log.address} - {log.patients} patient
              {log.patients > 1 ? "s" : ""}
            </AppText>
            <AppText style={styles.logText}>
              <AppText
                style={{
                  color:
                    log.status === "COMPLETED"
                      ? colors.primary
                      : colors.red[500],
                }}
              >
                {log.status}
              </AppText>
              {log.duration ? ` - ${log.duration}` : null}
            </AppText>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default TripLogsSection;

const styles = StyleSheet.create({
  listBox: {
    flex: 1,
    marginTop: 30,
    backgroundColor: colors.white,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    elevation: 10,
  },
  listHeader: {
    borderBottomWidth: 0.5,
    padding: 20,
    borderBottomColor: colors.borderBottom,
  },
  headerText: {
    alignSelf: "center",
    fontSize: 18,
    fontFamily: fontFamily[700],
  },
  logItem: {
    padding: 20,
    borderBottomColor: colors.borderBottom,
    borderWidth: 0.2,
    borderRadius: 5,
  },
  logText: {
    fontSize: 16,
    color: colors.secondary,
  },
  date: {
    fontSize: 18,
    color: colors.secondary,
  },
  case: {
    fontSize: 12,
  },
});
