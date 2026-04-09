import { useState, useEffect } from "react";
import { AgChartsReact } from "ag-charts-react";
import API_BASE from "../config/api";

export default function Doughnut() {
  const [options, setOptions] = useState({});

  useEffect(() => {
    const fetchDoughnutData = async () => {
      try {
        const res = await fetch(`${API_BASE}/charts/doughnut`);
        const result = await res.json();

        console.log("DOUGHNUT API:", result); // debug

        setOptions({
          data: result,
          series: [
            {
              type: "pie",
              calloutLabelKey: "asset",
              angleKey: "amount",
              innerRadiusRatio: 0.7,
            },
          ],
        });
      } catch (error) {
        console.error("Doughnut Chart Error:", error);
      }
    };

    fetchDoughnutData();
  }, []);

  return <AgChartsReact options={options} />;
}