import { useState, useEffect } from "react";
import { AgChartsReact } from "ag-charts-react";
import API_BASE from "../config/api";

export default function Linechart() {
  const [options, setOptions] = useState({});

  useEffect(() => {
    const fetchLineData = async () => {
      try {
        const [officeRes, loungeRes] = await Promise.all([
          fetch(`${API_BASE}/sensor/office`),
          fetch(`${API_BASE}/sensor/lounge`),
        ]);

        let officeData = (await officeRes.json()).map((d) => ({
          ...d,
          time: new Date(d.time),
          sensor: Number(d.sensor)
        }));

        let loungeData = (await loungeRes.json()).map((d) => ({
          ...d,
          time: new Date(d.time),
          sensor: Number(d.sensor)
        }));

        console.log("OFFICE:", officeData);
        console.log("LOUNGE:", loungeData);

        setOptions({
          title: {
            text: "Temperature Readings",
          },
          series: [
            {
              type: "line",
              data: officeData,
              xKey: "time",
              yKey: "sensor",
              yName: "Office",
            },
            {
              type: "line",
              data: loungeData,
              xKey: "time",
              yKey: "sensor",
              yName: "Lounge",
            },
          ],
          axes: [
            {
              type: "time",
              position: "bottom",
            },
            {
              type: "number",
              position: "left",
              label: {
                format: "#{.1f} °C",
              },
            },
          ],
        });
      } catch (error) {
        console.error("Line Chart Error:", error);
      }
    };

    fetchLineData();
  }, []);

  return <AgChartsReact options={options} />;
}
