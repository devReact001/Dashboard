import BarChartClient from "./BarChartClient";
import { fetchWithAuthServer } from "@/lib/api.server";

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
    const data: BarChartData[] = await fetchWithAuthServer(`/charts/bar`);

    return <BarChartClient data={data} />;
  } catch (error) {
    console.error("Bar Chart Error:", error);
    return <div>Error loading chart</div>;
  }
}
