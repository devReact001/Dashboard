import { useState, useEffect } from "react";
import { AgChartsReact } from "ag-charts-react";
import API_BASE from "../config/api";

export default function Piechart() {
  const [options, setOptions] = useState({});

  useEffect(() => {
    const fetchPieData = async () => {
      try {
        const res = await fetch(`${API_BASE}/charts/pie`);
        const result = await res.json();

        console.log("PIE API:", result); // debug

        setOptions({
          data: result,
          series: [
            {
              type: "pie",
              angleKey: "amount",
              legendItemKey: "asset",
            },
          ],
        });
      } catch (error) {
        console.error("Pie Chart Error:", error);
      }
    };

    fetchPieData();
  }, []);

  return <AgChartsReact options={options} />;
}