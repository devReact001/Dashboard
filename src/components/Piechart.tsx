import { useState, useEffect } from "react";
import { AgChartsReact } from "ag-charts-react";
import type { AgChartOptions } from "ag-charts-community";
import API_BASE from "../config/api";

interface PieData {
  asset: string;
  amount: number;
}

export default function Piechart(): JSX.Element {
  const [options, setOptions] = useState<AgChartOptions>({});

  useEffect(() => {
    const fetchPieData = async () => {
      try {
        const res = await fetch(`${API_BASE}/charts/pie`);
        const result: PieData[] = await res.json();

        const chartOptions: AgChartOptions = {
          data: result,
          series: [
            {
              type: "pie",
              angleKey: "amount",
              legendItemKey: "asset",
            },
          ],
        };

        setOptions(chartOptions);
      } catch (error) {
        console.error("Pie Chart Error:", error);
      }
    };

    fetchPieData();
  }, []);

  return <AgChartsReact options={options} />;
}