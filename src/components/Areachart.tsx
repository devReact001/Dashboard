import { useState, useEffect } from "react";
import { AgChartsReact } from "ag-charts-react";
import type { AgChartOptions } from "ag-charts-community";
import API_BASE from "../config/api";

type AreaData = {
  month: string;
  subscriptions: number;
  services: number;
  products: number;
};

export default function Areachart(): JSX.Element {
  const [options, setOptions] = useState<AgChartOptions>({});

  useEffect(() => {
    const fetchAreaData = async () => {
      try {
        const res = await fetch(`${API_BASE}/charts/area`);
        const result: AreaData[] = await res.json();

        setOptions({
          title: {
            text: "Sales by Month",
          },
          data: result,
          series: [
            {
              type: "area",
              xKey: "month",
              yKey: "subscriptions",
              yName: "Subscriptions",
            },
            {
              type: "area",
              xKey: "month",
              yKey: "services",
              yName: "Services",
            },
            {
              type: "area",
              xKey: "month",
              yKey: "products",
              yName: "Products",
            },
          ],
        });
      } catch (error) {
        console.error("Area Chart Error:", error);
      }
    };

    fetchAreaData();
  }, []);

  return <AgChartsReact options={options} />;
}