import { View, Text } from "react-native";

export default function StatsChart({ data }: any) {
  if (!data || data.length === 0) return null;

  const maxValue = Math.max(...data.map((d: any) => d.iphone));

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ color: "blue", marginBottom: 10 }}>
        iPhone Sales by Quarter
      </Text>

      {data.map((item: any, index: number) => (
        <View key={index} style={{ marginBottom: 10 }}>
          <Text style={{ color: "#94a3b8" }}>{item.quarter}</Text>

          <View
            style={{
              height: 10,
              width: (item.iphone / maxValue) * 250,
              backgroundColor: "#2563eb",
              borderRadius: 4,
              marginTop: 4,
            }}
          />
        </View>
      ))}
    </View>
  );
}