<script setup>
import { ref, onMounted } from "vue";
import { AgCharts } from "ag-charts-vue3";
import API from "../services/api";

const options = ref({});

onMounted(async () => {
  const res = await API.get("/charts/bar");

  options.value = {
    title: { text: "Revenue by Category" },
    data: res.data,
    series: [
      { type: "bar", xKey: "quarter", yKey: "iphone" },
      { type: "bar", xKey: "quarter", yKey: "mac" },
      { type: "bar", xKey: "quarter", yKey: "ipad" },
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