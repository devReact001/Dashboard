<script setup>
import { AgChartsVue } from "ag-charts-vue3";

const options = {
  title: { text: "Sales by Month" },
  data: [
    { month: "Jan", value: 200 },
    { month: "Feb", value: 300 },
  ],
  series: [
    {
      type: "area",
      xKey: "month",
      yKey: "value",
    },
  ],
};
</script>

<template>
  <AgChartsVue :options="options" />
</template>