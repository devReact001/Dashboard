import { useState, useEffect } from "react";
import { AgChartsReact } from "ag-charts-react";
import type { AgChartOptions } from "ag-charts-community";
import API_BASE from "../config/api";

interface DoughnutData {
  asset: string;
  amount: number;
}

export default function Doughnut(): JSX.Element {
  const [options, setOptions] = useState<AgChartOptions>({});

  useEffect(() => {
    const fetchDoughnutData = async () => {
      try {
        const res = await fetch(`${API_BASE}/charts/doughnut`);
        const result: DoughnutData[] = await res.json();

        const chartOptions: AgChartOptions = {
          data: result,
          series: [
            {
              type: "pie",
              calloutLabelKey: "asset",
              angleKey: "amount",
              innerRadiusRatio: 0.7,
            },
          ],
        };

        setOptions(chartOptions);
      } catch (error) {
        console.error("Doughnut Chart Error:", error);
      }
    };

    fetchDoughnutData();
  }, []);

  return <AgChartsReact options={options} />;
}