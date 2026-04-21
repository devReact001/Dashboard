<script setup>
import { ref, onMounted } from "vue";
import { AgCharts } from "ag-charts-vue3";
import API from "../services/api";

const options = ref({});

onMounted(async () => {
  const res = await API.get("/charts/area");

  options.value = {
    title: { text: "Sales by Month" },
    data: res.data,
    series: [
      { type: "area", xKey: "month", yKey: "subscriptions" },
      { type: "area", xKey: "month", yKey: "services" },
      { type: "area", xKey: "month", yKey: "products" },
    ],
  };
});
</script>

<template>
  <div class="card">
    <AgCharts :options="options" />
  </div>
</template>

<style scoped>
.chart {
  height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>