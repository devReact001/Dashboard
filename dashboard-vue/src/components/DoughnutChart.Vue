<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Chart } from "chart.js/auto";
import API from "../services/api";
const canvasRef = ref<HTMLCanvasElement | null>(null);
onMounted(async () => {
  const res = await API.get("/charts/pie");
  const data = res.data;
  new Chart(canvasRef.value!, {
    type: "pie",
    data: {
      labels: data.map((d: any) => d.asset),
      datasets: [{
        data: data.map((d: any) => d.amount),
        backgroundColor: ["#3b82f6", "#a78bfa", "#34d399", "#fb923c", "#f87171"],
        borderWidth: 2,
        borderColor: "#ffffff",
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: { padding: { top: 4, bottom: 0 } },
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            color: "#334155",
            boxWidth: 10,
            boxHeight: 10,
            padding: 8,
            font: { size: 10 },
          },
        },
      },
    },
  });
});
</script>
<template><div class="chart-wrap"><canvas ref="canvasRef"></canvas></div></template>
<style scoped>
.chart-wrap { position: relative; width: 100%; height: 100%; }
canvas { width: 100% !important; height: 100% !important; }
</style>