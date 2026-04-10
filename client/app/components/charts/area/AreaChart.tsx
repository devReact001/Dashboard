import AreaChartClient from "./AreaChartClient";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE!;

export type AreaData = {
  month: string;
  subscriptions: number;
  services: number;
  products: number;
};

export default async function AreaChart() {
  try {
    const res = await fetch(`${API_BASE}/charts/area`, {
      cache: "no-store",
    });

    const data: AreaData[] = await res.json();

    return <AreaChartClient data={data} />;
  } catch (error) {
    console.error("Area Chart Error:", error);
    return <div>Error loading area chart</div>;
  }
}