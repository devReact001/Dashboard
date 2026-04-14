import { View, Text } from "react-native";
import Svg, { Circle } from "react-native-svg";

export default function DoughnutChart({ data }: any) {
  if (!data || data.length === 0) return null;

  const size = 180;
  const strokeWidth = 30;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const total = data.reduce((sum: number, d: any) => sum + d.amount, 0);

  const colors = ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444"];

  let cumulative = 0;

  return (
    <View style={{ alignItems: "center", marginTop: 20 }}>
      <Text style={{ color: "blue", marginBottom: 10 }}>
        Asset Distribution
      </Text>

      <View style={{ position: "relative" }}>
        <Svg width={size} height={size}>
          {data.map((item: any, index: number) => {
            const value = item.amount;
            const percent = value / total;
            const dash = percent * circumference;

            const strokeDasharray = `${dash} ${circumference}`;
            const rotation = (cumulative / total) * 360;

            cumulative += value;

            return (
              <Circle
                key={index}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={colors[index % colors.length]}
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={strokeDasharray}
                rotation={rotation}
                origin={`${size / 2}, ${size / 2}`}
              />
            );
          })}
        </Svg>

        {/* ✅ Center hole (aligned + fixed color) */}
        <View
          style={{
            position: "absolute",
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: "transparent", // match your screen
            top: size / 2 - 40,
            left: size / 2 - 40,
          }}
        />
      </View>

      {/* ✅ Colored Legend */}
      <View style={{ marginTop: 15 }}>
        {data.map((item: any, index: number) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 5,
            }}
          >
            {/* Color dot */}
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: colors[index % colors.length],
                marginRight: 8,
              }}
            />

            <Text style={{ color: "#94a3b8" }}>
              {item.asset}: {item.amount}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}