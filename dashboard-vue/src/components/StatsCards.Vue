<script setup lang="ts">
import { ref, onMounted } from "vue";
import API from "../services/api";

const stats = ref<any>(null);

onMounted(async () => {
  const res = await API.get("/dashboard/stats");
  stats.value = res.data;
});
</script>

<template>
  <div class="cards" v-if="stats">
    <div class="card">Active Users: {{ stats.activeUsers }}</div>
    <div class="card">Total Users: {{ stats.totalUsers }}</div>
    <div class="card">Applications: {{ stats.applications }}</div>
  </div>
</template>

<style scoped>
.cards {
  display: contents; /* IMPORTANT: lets parent grid control layout */
}

.card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}
</style>