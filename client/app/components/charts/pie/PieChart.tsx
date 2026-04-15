import PieChartClient from "./PieChartClient";
import { fetchWithAuthServer } from "@/lib/api.server";

export interface PieData {
  asset: string;
  amount: number;
}

export default async function PieChart() {
  try {
    const data: PieData[] = await fetchWithAuthServer(`/charts/pie`);
    return <PieChartClient data={data} />;
  } catch (error) {
    console.error("Pie Chart Error:", error);
    return <div>Error loading pie chart</div>;
  }
}