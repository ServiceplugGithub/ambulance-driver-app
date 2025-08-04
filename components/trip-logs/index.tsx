// components/TripLogsSection.tsx
import { fontFamily } from "@/constants/fonts";
import { colors } from "@/utils/constants/colors";
import moment from "moment";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import AppText from "../AppText";

interface EventItem {
  event: string;
  remarks: string;
  timestamp: string;
  userId?: string;
}
interface LogItem {
  caseID: number;
  timestamp: number;
  address: string;
  patients: number;
  duration?: string;
  status: string;
  ambulanceOrigin: {
    timestamp: number;
  };
  location: string;
  events: EventItem[];
}

interface TripLogsSectionProps {
  logs: LogItem[];
}

const TripLogsSection: React.FC<TripLogsSectionProps> = ({ logs }) => {
  return (
    <View style={styles.listBox}>
      <View style={styles.listHeader}>
        {/* <AppText style={styles.headerText}>Details</AppText> */}
      </View>
      <ScrollView>
        {logs.map((log) => (
          <View key={log.caseID} style={styles.logItem}>
            <AppText style={styles.case}>#{log.caseID}</AppText>
            <AppText style={styles.date}>
              <AppText style={styles.date}>
                {moment(log.ambulanceOrigin.timestamp).format(
                  "DD MMM YYYY • hh:mm A"
                )}
              </AppText>{" "}
            </AppText>
            <AppText>
              Trip to - {log.location}
              {log.patients > 1 ? "s" : ""}
            </AppText>
            {log.events && log.events.length > 0 && (
              <AppText style={styles.logText}>
                <AppText
                  style={{
                    color:
                      log.events[log.events.length - 1].event.toUpperCase() ===
                      "TERMINATED"
                        ? colors.red[500]
                        : log.events[
                            log.events.length - 1
                          ].event.toUpperCase() === "CASE FINISHED"
                        ? colors.green[500]
                        : colors.yellow[600],
                    fontWeight: "bold",
                  }}
                >
                  {log.events[log.events.length - 1].event.toUpperCase()}
                </AppText>
              </AppText>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default TripLogsSection;

const styles = StyleSheet.create({
  listBox: {
    // flex: 1,
    // marginTop: 30,
    // backgroundColor: colors.white,
    // borderTopLeftRadius: 40,
    // borderTopRightRadius: 40,
    // elevation: 10,
  },
  listHeader: {
    borderBottomWidth: 0.5,
    // padding: 20,
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
