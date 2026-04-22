<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Chart } from "chart.js/auto";
import API from "../services/api";
const canvasRef = ref<HTMLCanvasElement | null>(null);
onMounted(async () => {
  const [officeRes, loungeRes] = await Promise.all([API.get("/sensor/office"), API.get("/sensor/lounge")]);
  const office = officeRes.data;
  const lounge = loungeRes.data;
  new Chart(canvasRef.value!, {
    type: "line",
    data: {
      labels: office.map((d: any) => new Date(d.time).toLocaleTimeString()),
      datasets: [
        { label: "Office", data: office.map((d: any) => d.sensor), borderColor: "#3b82f6", tension: 0.4, pointRadius: 3 },
        { label: "Lounge", data: lounge.map((d: any) => d.sensor), borderColor: "#a78bfa", tension: 0.4, pointRadius: 3 },
      ],
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: "#e2e8f0" } } }, scales: { x: { ticks: { color: "#94a3b8" }, grid: { color: "#1e293b" } }, y: { ticks: { color: "#94a3b8" }, grid: { color: "#1e293b" } } } },
  });
});
</script>
<template><div class="chart-wrap"><canvas ref="canvasRef"></canvas></div></template>
<style scoped>.chart-wrap { position: relative; width: 100%; height: 100%; } canvas { width: 100% !important; height: 100% !important; }</style>
