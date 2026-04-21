<script setup lang="ts">
import { onMounted, ref } from "vue";
import API from "../services/api";
import Layout from "../components/Layout.vue";

const stats = ref<any>(null);

onMounted(async () => {
  const res = await API.get("/dashboard/stats");
  stats.value = res.data;
});
</script>

<template>
  <Layout>
    <h1>Vue Dashboard</h1>

    <div class="cards" v-if="stats">
      <div class="card">Active Users: {{ stats.active_users }}</div>
      <div class="card">Total Users: {{ stats.total_users }}</div>
      <div class="card">Applications: {{ stats.applications }}</div>
    </div>
  </Layout>
</template>

<style scoped>
.cards {
  display: flex;
  gap: 20px;
}
.card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  flex: 1;
}
</style>