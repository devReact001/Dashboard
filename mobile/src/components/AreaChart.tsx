import { View, Text, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function AreaChart({ data }: any) {
  if (!data || data.length === 0) return null;

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ color: "blue", marginBottom: 10 }}>
        Sales Trend
      </Text>

      <LineChart
        data={{
          labels: data.map((d: any) => d.month),
          datasets: [
            {
              data: data.map((d: any) => d.subscriptions),
            },
          ],
        }}
        width={screenWidth - 40}
        height={220}
        withDots={false}
        withInnerLines={false}
        withOuterLines={true}
        withShadow={true}
        chartConfig={{
          backgroundGradientFrom: "#020617",
          backgroundGradientTo: "#020617",

          // 🔥 Line color
          color: (opacity = 1) =>
            `rgba(34, 197, 94, ${opacity})`, // green

          // 🔥 Labels color
          labelColor: () => "#94a3b8",

          // 🔥 Area fill
          fillShadowGradient: "#22c55e",
          fillShadowGradientOpacity: 0.4,

          propsForBackgroundLines: {
            stroke: "#1e293b",
          },
        }}
        style={{
          borderRadius: 12,
        }}
      />
    </View>
  );
}