import { fontFamily } from "@/constants/fonts";
import { colors } from "@/utils/constants/colors";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { BarChart } from "react-native-chart-kit";
import AppText from "../AppText";

const screenWidth = Dimensions.get("window").width;

interface WeeklyReportChartProps {
  todayTrips: number;
  totalTrips: number;
  data: number[];
}

const WeeklyReportChart: React.FC<WeeklyReportChartProps> = ({
  todayTrips,
  totalTrips,
  data,
}) => {
  return (
    <View style={styles.container}>
      <AppText style={styles.title}>Weekly Report</AppText>
      <View style={styles.tripStats}>
        <AppText style={styles.subTitle}>Todays Trips : {todayTrips}</AppText>
        <AppText style={styles.subTitle}>Total Trips : {totalTrips}</AppText>
      </View>
      <BarChart
        data={{
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          datasets: [{ data }],
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
