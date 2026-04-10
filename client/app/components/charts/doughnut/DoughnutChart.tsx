import DoughnutChartClient from "./DoughnutChartClient";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE!;

export interface DoughnutData {
  asset: string;
  amount: number;
}

export default async function DoughnutChart() {
  try {
    const res = await fetch(`${API_BASE}/charts/doughnut`, {
      cache: "no-store",
    });

    const data: DoughnutData[] = await res.json();

    return <DoughnutChartClient data={data} />;
  } catch (error) {
    console.error("Doughnut Chart Error:", error);
    return <div>Error loading doughnut chart</div>;
  }
}