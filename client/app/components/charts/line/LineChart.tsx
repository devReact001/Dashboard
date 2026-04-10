import LineChartClient from "./LineChartClient";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE!;

export interface SensorData {
  time: Date;
  sensor: number;
}

interface ApiResponse {
  time: string;
  sensor: number | string;
}

export default async function LineChart() {
  try {
    const [officeRes, loungeRes] = await Promise.all([
      fetch(`${API_BASE}/sensor/office`, { cache: "no-store" }),
      fetch(`${API_BASE}/sensor/lounge`, { cache: "no-store" }),
    ]);

    const officeJson: ApiResponse[] = await officeRes.json();
    const loungeJson: ApiResponse[] = await loungeRes.json();

    const officeData: SensorData[] = officeJson.map((d) => ({
      time: new Date(d.time),
      sensor: Number(d.sensor),
    }));

    const loungeData: SensorData[] = loungeJson.map((d) => ({
      time: new Date(d.time),
      sensor: Number(d.sensor),
    }));

    return (
      <LineChartClient officeData={officeData} loungeData={loungeData} />
    );
  } catch (error) {
    console.error("Line Chart Error:", error);
    return <div>Error loading line chart</div>;
  }
}