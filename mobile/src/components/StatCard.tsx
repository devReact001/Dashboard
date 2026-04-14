import { View, Text } from "react-native";

export default function StatCard({ title, value }: any) {
  return (
    <View
      style={{
        backgroundColor: "#1e293b",
        padding: 20,
        borderRadius: 12,
        marginBottom: 15,
      }}
    >
      <Text style={{ color: "#94a3b8", fontSize: 14 }}>
        {title}
      </Text>
      <Text style={{ color: "white", fontSize: 22, fontWeight: "bold" }}>
        {value}
      </Text>
    </View>
  );
}