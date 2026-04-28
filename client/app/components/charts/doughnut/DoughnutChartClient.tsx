"use client";

import { AgChartsReact } from "ag-charts-react";
import type { AgChartOptions } from "ag-charts-community";
import type { DoughnutData } from "./DoughnutChart";

interface Props {
  data: DoughnutData[];
}

export default function DoughnutChartClient({ data }: Props) {
  const options: AgChartOptions = {
    title: {
      text: "Portfolio Allocation",
    },
    data,
    series: [
      {
        type: "pie",
        calloutLabelKey: "asset",
        angleKey: "amount",
        innerRadiusRatio: 0.7,
      },
    ],
  };

  return <AgChartsReact options={options} />;
}