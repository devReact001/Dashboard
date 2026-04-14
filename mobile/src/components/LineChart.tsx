import { View, Text, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function LineChartRN({ officeData, loungeData }: any) {
  if (!officeData || !loungeData) return null;

  // 🔥 Format time labels (HH:mm)
  const labels = officeData.map((d: any, index: number) => {
    // show every 3rd label only
    return index % 3 === 0
      ? new Date(d.time).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "";
  });

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ color: "white", marginBottom: 10 }}>
        Temperature Readings
      </Text>

      <LineChart
        data={{
          labels,
          datasets: [
            {
              data: officeData.map((d: any) => d.sensor),
              color: () => "#3b82f6", // Office (blue)
              strokeWidth: 2,
            },
            {
              data: loungeData.map((d: any) => d.sensor),
              color: () => "#22c55e", // Lounge (green)
              strokeWidth: 2,
            },
          ],
          legend: ["Office", "Lounge"], // ✅ legend
        }}
        width={screenWidth - 40}
        height={220}
        withDots={false} // clean
        withInnerLines={false} // remove grid
        withOuterLines={true}
        chartConfig={{
          backgroundGradientFrom: "#020617",
          backgroundGradientTo: "#020617",

          // ✅ REQUIRED FIX
          color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,

          labelColor: () => "#94a3b8",

          propsForBackgroundLines: {
            stroke: "#1e293b",
          },
        }}
        bezier // smooth curves
        style={{
          borderRadius: 12,
        }}
      />
    </View>
  );
}
