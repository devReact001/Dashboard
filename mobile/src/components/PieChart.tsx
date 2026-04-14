import { View, Text } from "react-native";
import Svg, { Path } from "react-native-svg";

export default function PieChart({ data }: any) {
  if (!data || data.length === 0) return null;

  const size = 180;
  const radius = size / 2;
  const center = size / 2;

  const total = data.reduce((sum: number, d: any) => sum + d.amount, 0);

  const colors = ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444"];

  // 🔥 Convert polar → cartesian
  const polarToCartesian = (cx: number, cy: number, r: number, angle: number) => {
    const rad = (angle - 90) * (Math.PI / 180);
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  };

  // 🔥 Create arc path
  const createArc = (
    startAngle: number,
    endAngle: number
  ) => {
    const start = polarToCartesian(center, center, radius, endAngle);
    const end = polarToCartesian(center, center, radius, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return `
      M ${center} ${center}
      L ${start.x} ${start.y}
      A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}
      Z
    `;
  };

  let cumulative = 0;

  return (
    <View style={{ alignItems: "center", marginTop: 20 }}>
      <Text style={{ color: "blue", marginBottom: 10 }}>
        Asset Breakdown
      </Text>

      <Svg width={size} height={size}>
        {data.map((item: any, index: number) => {
          const value = item.amount;
          const angle = (value / total) * 360;

          const startAngle = cumulative;
          const endAngle = cumulative + angle;

          cumulative += angle;

          return (
            <Path
              key={index}
              d={createArc(startAngle, endAngle)}
              fill={colors[index % colors.length]}
            />
          );
        })}
      </Svg>

      {/* Legend */}
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