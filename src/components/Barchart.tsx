import { useState, useEffect } from "react";
import { AgChartsReact } from "ag-charts-react";
import type { AgChartOptions } from "ag-charts-community";
import API_BASE from "../config/api";

interface BarChartData {
  quarter: string;
  iphone: number;
  mac: number;
  ipad: number;
  wearables: number;
  services: number;
}

export default function Barchart(): JSX.Element {
  const [options, setOptions] = useState<AgChartOptions>({});

  useEffect(() => {
    const fetchBarData = async () => {
      try {
        const res = await fetch(`${API_BASE}/charts/bar`);
        const result: BarChartData[] = await res.json();

        const chartOptions: AgChartOptions = {
          title: {
            text: "Revenue by Product Category",
          },
          subtitle: {
            text: "In Billion U.S. Dollars",
          },
          data: result,
          series: [
            {
              type: "bar",
              xKey: "quarter",
              yKey: "iphone",
              yName: "iPhone",
            },
            {
              type: "bar",
              xKey: "quarter",
              yKey: "mac",
              yName: "Mac",
            },
            {
              type: "bar",
              xKey: "quarter",
              yKey: "ipad",
              yName: "iPad",
            },
            {
              type: "bar",
              xKey: "quarter",
              yKey: "wearables",
              yName: "Wearables",
            },
            {
              type: "bar",
              xKey: "quarter",
              yKey: "services",
              yName: "Services",
            },
          ],
        };

        setOptions(chartOptions);
      } catch (error) {
        console.error("Bar Chart Error:", error);
      }
    };

    fetchBarData();
  }, []);

  return <AgChartsReact options={options} />;
}