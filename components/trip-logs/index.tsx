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
    <View>
      {/* <View style={styles.listHeader}>
      </View> */}
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
  headerText: {
    alignSelf: "center",
    fontSize: 18,
    fontFamily: fontFamily[700],
  },
  logItem: {
    padding: 20,
    // borderBottomColor: colors.borderBottom,
    // borderWidth: 0.2,
    borderRadius: 5,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    marginVertical: 4,
    marginHorizontal: 4
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
