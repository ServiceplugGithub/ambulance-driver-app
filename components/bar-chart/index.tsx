import { fontFamily } from "@/constants/fonts";
import { colors } from "@/utils/constants/colors";
import moment from "moment";
import React, { useMemo } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { BarChart } from "react-native-chart-kit";
import AppText from "../AppText";

const screenWidth = Dimensions.get("window").width;

interface WeeklyReportChartProps {
  data: any[];
}

const WeeklyReportChart: React.FC<WeeklyReportChartProps> = ({ data }) => {
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const weeklyCounts = useMemo(() => {
    const counts = new Array(7).fill(0); // Initialize counts for Mon–Sun as 0
    const today = moment();
    const startOfWeek = moment().startOf("isoWeek"); // Monday

    data.forEach((item) => {
      const date = moment(item.createdAt);
      if (
        date.isBetween(
          startOfWeek.clone().subtract(1, "day"),
          today.clone().endOf("day")
        )
      ) {
        const dayIndex = date.isoWeekday() - 1; // 0 (Mon) to 6 (Sun)
        if (dayIndex >= 0 && dayIndex <= 6) {
          counts[dayIndex]++;
        }
      }
    });

    return counts;
  }, [data]);

  return (
    <View style={styles.container}>
      <AppText style={styles.title}>Weekly Report</AppText>
      <View style={styles.tripStats}>
        <AppText style={styles.subTitle}>Todays Trips: </AppText>
        <AppText style={styles.subTitle}>Total Trips: {data.length}</AppText>
      </View>
      <BarChart
        data={{
          labels: weekdays,
          datasets: [{ data: weeklyCounts }],
        }}
        width={screenWidth - 40}
        height={220}
        yAxisLabel=""
        yAxisSuffix=""
        fromZero
        showValuesOnTopOfBars
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#f5f5f5",
          backgroundGradientTo: "#f5f5f5",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          barPercentage: 0.6,
        }}
        style={{ borderRadius: 5 }}
      />
    </View>
  );
};

export default WeeklyReportChart;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginHorizontal: 10,
    marginTop: 10,
    elevation: 5,
    backgroundColor: colors.white,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontFamily: fontFamily[600],
  },
  subTitle: {
    fontSize: 15,
  },
  tripStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
});
