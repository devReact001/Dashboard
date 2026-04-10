import { useState, useEffect } from "react";
import { AgChartsReact } from "ag-charts-react";
import type { AgChartOptions } from "ag-charts-community";
import API_BASE from "../config/api";

interface SensorData {
  time: Date;
  sensor: number;
}

interface ApiResponse {
  time: string;
  sensor: number | string;
}

export default function Linechart(): JSX.Element {
  const [options, setOptions] = useState<AgChartOptions>({});

  useEffect(() => {
    const fetchLineData = async () => {
      try {
        const [officeRes, loungeRes] = await Promise.all([
          fetch(`${API_BASE}/sensor/office`),
          fetch(`${API_BASE}/sensor/lounge`),
        ]);

        const officeJson: ApiResponse[] = await officeRes.json();
        const loungeJson: ApiResponse[] = await loungeRes.json();

        const officeData: SensorData[] = officeJson.map((d) => ({
          time: new Date(d.time),
          sensor: Number(d.sensor),
        }));

        const loungeData: SensorData[] = loungeJson.map((d) => ({
          time: new Date(d.time),
          sensor: Number(d.sensor),
        }));

        const chartOptions: AgChartOptions = {
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
        };

        setOptions(chartOptions);
      } catch (error) {
        console.error("Line Chart Error:", error);
      }
    };

    fetchLineData();
  }, []);

  return <AgChartsReact options={options} />;
}