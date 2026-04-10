import BarChartClient from "./BarChartClient";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE!;

export interface BarChartData {
  quarter: string;
  iphone: number;
  mac: number;
  ipad: number;
  wearables: number;
  services: number;
}

export default async function BarChart() {
  try {
    const res = await fetch(`${API_BASE}/charts/bar`, {
      cache: "no-store",
    });

    const data: BarChartData[] = await res.json();

    return <BarChartClient data={data} />;
  } catch (error) {
    console.error("Bar Chart Error:", error);
    return <div>Error loading chart</div>;
  }
}