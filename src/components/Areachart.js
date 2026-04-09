import { useState, useEffect } from "react";
import { AgChartsReact } from "ag-charts-react";
import API_BASE from "../config/api";

export default function Areachart() {
  const [options, setOptions] = useState({});

  useEffect(() => {
    const fetchAreaData = async () => {
      try {
        const res = await fetch(`${API_BASE}/charts/area`);
        const result = await res.json();

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