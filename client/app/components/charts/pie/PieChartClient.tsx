"use client";

import { AgChartsReact } from "ag-charts-react";
import type { AgChartOptions } from "ag-charts-community";
import type { PieData } from "./PieChart";

interface Props {
  data: PieData[];
}

export default function PieChartClient({ data }: Props) {
  const options: AgChartOptions = {
    data,
    series: [
      {
        type: "pie",
        angleKey: "amount",
        legendItemKey: "asset",
      },
    ],
  };

  return <AgChartsReact options={options} />;
}