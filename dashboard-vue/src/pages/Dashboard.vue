<script setup lang="ts">
import Layout from "../components/Layout.vue";
import StatsCards from "../components/StatsCards.vue";
import AreaChart from "../components/AreaChart.vue";
import BarChart from "../components/BarChart.vue";
import PieChart from "../components/PieChart.vue";
import DoughnutChart from "../components/DoughnutChart.vue";
import Table from "../components/Table.vue";
import Notifications from "../components/Notifications.vue";
</script>

<template>
  <Layout>
    <div class="dashboard">
      <h1>Vue Dashboard</h1>

      <!-- Stats -->
      <div class="stats">
        <StatsCards />
      </div>

      <!-- Charts Row 1 -->
      <div class="charts">
        <AreaChart />
        <BarChart />
      </div>

      <!-- Charts Row 2 -->
      <div class="charts-2">
        <PieChart />
        <DoughnutChart />
      </div>

      <!-- Bottom -->
      <div class="bottom">
        <Table />
        <Notifications />
      </div>
    </div>
  </Layout>
</template>

<style scoped>
.dashboard {
  padding: 20px;
  background: #f4f6f9;
  min-height: 100vh;
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 20px;
}

.charts {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.charts-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.bottom {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
}
</style>