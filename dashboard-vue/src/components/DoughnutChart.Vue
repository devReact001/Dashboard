<script setup>
import { ref, onMounted } from "vue";
import { AgCharts } from "ag-charts-vue3";
import API from "../services/api";

const options = ref({});

onMounted(async () => {
  const res = await API.get("/charts/simple/doughnut");

  options.value = {
    data: res.data,
    series: [
      {
        type: "pie",
        angleKey: "amount",
        innerRadiusRatio: 0.7,
      },
    ],
  };
});
</script>

<template>
  <div class="card">
    <AgCharts :options="options" />
  </div>
</template>