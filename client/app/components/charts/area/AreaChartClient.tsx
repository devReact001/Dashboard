"use client";

import { AgChartsReact } from "ag-charts-react";
import type { AgChartOptions } from "ag-charts-community";
import type { AreaData } from "./AreaChart";

interface Props {
  data: AreaData[];
}

export default function AreaChartClient({ data }: Props) {
  const options: AgChartOptions = {
    title: {
      text: "Sales by Month",
    },
    data,
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
  };

  return <AgChartsReact options={options} />;
}