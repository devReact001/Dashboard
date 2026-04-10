"use client";

import { AgChartsReact } from "ag-charts-react";
import type { AgChartOptions } from "ag-charts-community";
import type { SensorData } from "./LineChart";

interface Props {
  officeData: SensorData[];
  loungeData: SensorData[];
}

export default function LineChartClient({
  officeData,
  loungeData,
}: Props) {
  const options: AgChartOptions = {
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

  return <AgChartsReact options={options} />;
}