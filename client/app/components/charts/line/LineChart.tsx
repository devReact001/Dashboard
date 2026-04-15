import LineChartClient from "./LineChartClient";
import { fetchWithAuthServer } from "@/lib/api.server";

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
      fetchWithAuthServer(`/sensor/office`),
      fetchWithAuthServer(`/sensor/lounge`),
    ]);

    const officeData: SensorData[] = officeRes.map((d: SensorData) => ({
      time: new Date(d.time),
      sensor: Number(d.sensor),
    }));

    const loungeData: SensorData[] = loungeRes.map((d: SensorData) => ({
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