<script setup lang="ts">
import StatsCards from "../components/StatsCards.Vue";
import AreaChart from "../components/AreaChart.Vue";
import BarChart from "../components/BarChart.Vue";
import LineChart from "../components/LineChart.vue";
import PieChart from "../components/PieChart.Vue";
import DoughnutChart from "../components/DoughnutChart.Vue";
import Table from "../components/Table.Vue";
import Sidebar from "../components/Sidebar.vue";
</script>

<template>
  <div class="grid-container">
    <div class="item1"><Sidebar /></div>
    <div class="item2"><StatsCards /></div>
    <div class="item4 card"><h4>Area Chart</h4><AreaChart /></div>
    <div class="item3 card"><h4>Candidates</h4><Table /></div>
    <div class="item6 card"><h4>Line Chart (Sensor)</h4><LineChart /></div>
    <div class="item7 card"><h4>Bar Chart</h4><BarChart /></div>
    <div class="item8 card"><h4>Doughnut Chart</h4><DoughnutChart /></div>
    <div class="item9 card"><h4>Pie Chart</h4><PieChart /></div>
  </div>
</template>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(12, 1fr);
  gap: 10px;
  background-color: #1e293b;
  padding: 20px;
  height: 100vh;
  box-sizing: border-box;
}

.item1 { grid-column: 1 / 3;  grid-row: 1 / 13; overflow: hidden; }
.item2 { grid-column: 3 / 9;  grid-row: 1 / 5;  display: flex; gap: 10px; overflow: hidden; }
.item3 { grid-column: 3 / 9;  grid-row: 5 / 9;  overflow: hidden; display: flex; flex-direction: column; }
.item4 { grid-column: 9 / 13; grid-row: 1 / 5;  overflow: hidden; }
.item6 { grid-column: 9 / 13; grid-row: 5 / 9;  overflow: hidden; }
.item7 { grid-column: 9 / 13; grid-row: 9 / 13; overflow: hidden; }
.item8 { grid-column: 3 / 6;  grid-row: 9 / 13; overflow: hidden; }
.item9 { grid-column: 6 / 9;  grid-row: 9 / 13; overflow: hidden; }

.card {
  background: #ffffff;
  border-radius: 20px;
  border: 1px solid #1e293b;
  padding: 16px;
  color: #1e293b;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  min-height: 0;
}
.card h4 {
  margin: 0 0 8px;
  font-size: 11px;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  flex-shrink: 0;
}
.card > *:not(h4) { flex: 1; min-height: 0; }

/* Force table wrapper to fill card and use flex column layout */
.item3.card :deep(.table-wrapper) {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

@media (max-width: 1079px) {
  .grid-container { height: auto; overflow: auto; grid-template-columns: repeat(2, 1fr); grid-template-rows: auto; }
  .item1,.item2,.item3,.item4,.item6,.item7,.item8,.item9 { grid-column: auto; grid-row: auto; min-height: 300px; }
  .item1 { grid-column: 1 / -1; min-height: auto; }
  .item2 { grid-column: 1 / -1; min-height: auto; }
  .item3 { grid-column: 1 / -1; min-height: 320px; }
}
@media (max-width: 640px) { .grid-container { grid-template-columns: 1fr; } }
</style>