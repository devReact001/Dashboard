import PieChartClient from "./PieChartClient";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE!;

export interface PieData {
  asset: string;
  amount: number;
}

export default async function PieChart() {
  try {
    const res = await fetch(`${API_BASE}/charts/pie`, {
      cache: "no-store",
    });

    const data: PieData[] = await res.json();

    return <PieChartClient data={data} />;
  } catch (error) {
    console.error("Pie Chart Error:", error);
    return <div>Error loading pie chart</div>;
  }
}