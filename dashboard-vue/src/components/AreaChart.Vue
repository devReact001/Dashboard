<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Chart } from "chart.js/auto";
import API from "../services/api";
const canvasRef = ref<HTMLCanvasElement | null>(null);
onMounted(async () => {
  const res = await API.get("/charts/area");
  const data = res.data;
  new Chart(canvasRef.value!, {
    type: "line",
    data: {
      labels: data.map((d: any) => d.month),
      datasets: [
        { label: "Subscriptions", data: data.map((d: any) => d.subscriptions), fill: true, backgroundColor: "rgba(59,130,246,0.15)", borderColor: "#3b82f6", tension: 0.4 },
        { label: "Services", data: data.map((d: any) => d.services), fill: true, backgroundColor: "rgba(167,139,250,0.15)", borderColor: "#a78bfa", tension: 0.4 },
        { label: "Products", data: data.map((d: any) => d.products), fill: true, backgroundColor: "rgba(52,211,153,0.15)", borderColor: "#34d399", tension: 0.4 },
      ],
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: "#e2e8f0" } } }, scales: { x: { ticks: { color: "#94a3b8" }, grid: { color: "#1e293b" } }, y: { ticks: { color: "#94a3b8" }, grid: { color: "#1e293b" } } } },
  });
});
</script>
<template><div class="chart-wrap"><canvas ref="canvasRef"></canvas></div></template>
<style scoped>.chart-wrap { position: relative; width: 100%; height: 100%; } canvas { width: 100% !important; height: 100% !important; }</style>
