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
    <div class="card">Active Users: {{ stats.active_users }}</div>
    <div class="card">Total Users: {{ stats.total_users }}</div>
    <div class="card">Applications: {{ stats.applications }}</div>
  </div>
</template>

<style scoped>
.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.card {
  background: #ffb347;
  color: white;
  padding: 20px;
  border-radius: 12px;
  font-weight: bold;
  text-align: center;
  font-size: 18px;
}
</style>