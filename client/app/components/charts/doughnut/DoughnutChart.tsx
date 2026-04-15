import DoughnutChartClient from "./DoughnutChartClient";
import { fetchWithAuthServer } from "@/lib/api.server";

export interface DoughnutData {
  asset: string;
  amount: number;
}

export default async function DoughnutChart() {
  try {
    const data: DoughnutData[] = await fetchWithAuthServer(`/charts/doughnut`);
    return <DoughnutChartClient data={data} />;
  } catch (error) {
    console.error("Doughnut Chart Error:", error);
    return <div>Error loading doughnut chart</div>;
  }
}