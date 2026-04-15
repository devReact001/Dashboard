import AreaChartClient from "./AreaChartClient";
import { fetchWithAuthServer } from "@/lib/api.server";

export type AreaData = {
  month: string;
  subscriptions: number;
  services: number;
  products: number;
};

export default async function AreaChart() {
  try { 
    const data: AreaData[] = await fetchWithAuthServer(`/charts/area`);
    return <AreaChartClient data={data} />;
  } catch (error) {
    console.error("Area Chart Error:", error);
    return <div>Error loading area chart</div>;
  }
}