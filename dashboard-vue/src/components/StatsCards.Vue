<script setup lang="ts">
import { ref, onMounted } from "vue";
import API from "../services/api";

const stats = ref<any>(null);

const cards = [
  {
    key: "active_users",
    label: "Active Users",
    bg: "linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%)",
    shadow: "0 8px 24px rgba(14,165,233,0.35)",
    shadowHover: "0 12px 32px rgba(14,165,233,0.45)",
  },
  {
    key: "total_users",
    label: "Total Users",
    bg: "linear-gradient(135deg, #34d399 0%, #10b981 100%)",
    shadow: "0 8px 24px rgba(52,211,153,0.35)",
    shadowHover: "0 12px 32px rgba(52,211,153,0.45)",
  },
  {
    key: "applications",
    label: "Applications",
    bg: "linear-gradient(135deg, #fb923c 0%, #f97316 100%)",
    shadow: "0 8px 24px rgba(251,146,60,0.35)",
    shadowHover: "0 12px 32px rgba(251,146,60,0.45)",
  },
];

onMounted(async () => {
  const res = await API.get("/dashboard/stats");
  stats.value = res.data;
});
</script>

<template>
  <div
    v-for="card in cards"
    :key="card.key"
    class="info-card"
    :style="{ background: card.bg, boxShadow: card.shadow }"
    @mouseenter="(e: MouseEvent) => (e.currentTarget as HTMLElement).style.boxShadow = card.shadowHover"
    @mouseleave="(e: MouseEvent) => (e.currentTarget as HTMLElement).style.boxShadow = card.shadow"
  >
    <span class="card-label">{{ card.label }}</span>
    <span class="card-value">{{ stats ? (stats[card.key]?.toLocaleString() ?? '—') : '—' }}</span>
  </div>
</template>

<style scoped>
.info-card {
  flex: 1;
  border-radius: 16px;
  padding: 14px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  overflow: hidden;
  transition: transform 0.22s ease, box-shadow 0.22s ease;
  cursor: default;
}
.info-card:hover { transform: translateY(-3px); }

.card-label {
  font-size: clamp(0.6rem, 0.9vw, 0.75rem);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.65);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}
.card-value {
  font-size: clamp(1.3rem, 2.2vw, 2rem);
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -0.025em;
  line-height: 1.1;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}
</style>