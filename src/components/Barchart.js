import { useState, useEffect } from "react";
import { AgChartsReact } from "ag-charts-react";
import API_BASE from "../config/api";

export default function Barchart() {
  const [options, setOptions] = useState({});

  useEffect(() => {
    const fetchBarData = async () => {
      try {
        const res = await fetch(`${API_BASE}/charts/bar`);
        const result = await res.json();

        console.log("BAR API:", result); // debug

        setOptions({
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
        });
      } catch (error) {
        console.error("Bar Chart Error:", error);
      }
    };

    fetchBarData();
  }, []);

  return <AgChartsReact options={options} />;
}