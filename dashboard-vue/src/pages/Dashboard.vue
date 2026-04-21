<script setup lang="ts">
import StatsCards from "../components/StatsCards.vue";
import AreaChart from "../components/AreaChart.vue";
import BarChart from "../components/BarChart.vue";
import PieChart from "../components/PieChart.vue";
import DoughnutChart from "../components/DoughnutChart.vue";
import Table from "../components/Table.vue";
import Notifications from "../components/Notifications.vue";
</script>

<template>
    <div class="dashboard">

      <h1>Vue Dashboard</h1>

      <!-- STATS -->
      <div class="stats">
        <StatsCards />
      </div>

      <!-- TOP CHARTS -->
      <div class="grid-2">
        <AreaChart />
        <BarChart />
      </div>

      <!-- PIE -->
      <div class="grid-2">
        <PieChart />
        <DoughnutChart />
      </div>

      <!-- BOTTOM -->
      <div class="grid-2">
        <Table />
        <Notifications />
      </div>

    </div>
</template>

<style scoped>
.dashboard {
  padding: 24px;
  background: #f4f6f9;
  min-height: 100vh;
}

/* TITLE */
h1 {
  margin-bottom: 20px;
}

/* STATS */
.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  margin-bottom: 20px;
}

/* GENERIC GRID */
.grid-2 {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

/* FORCE CARD HEIGHT CONSISTENCY */
.grid-2 > * {
  min-height: 320px;
}
</style>