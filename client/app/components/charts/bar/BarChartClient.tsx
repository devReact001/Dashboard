"use client";

import { AgChartsReact } from "ag-charts-react";
import type { AgChartOptions } from "ag-charts-community";
import type { BarChartData } from "./BarChart";

interface Props {
  data: BarChartData[];
}

export default function BarChartClient({ data }: Props) {
  const options: AgChartOptions = {
    title: {
      text: "Revenue by Product Category",
    },
    subtitle: {
      text: "In Billion U.S. Dollars",
    },
    data,
    series: [
      { type: "bar", xKey: "quarter", yKey: "iphone", yName: "iPhone" },
      { type: "bar", xKey: "quarter", yKey: "mac", yName: "Mac" },
      { type: "bar", xKey: "quarter", yKey: "ipad", yName: "iPad" },
      { type: "bar", xKey: "quarter", yKey: "wearables", yName: "Wearables" },
      { type: "bar", xKey: "quarter", yKey: "services", yName: "Services" },
    ],
  };

  return <AgChartsReact options={options} />;
}