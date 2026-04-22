<script setup lang="ts">
import { ref, onMounted } from "vue";
import API from "../services/api";
const columns = ref<{ header: string; accessor: string }[]>([]);
const data = ref<any[]>([]);
const page = ref(1);
const totalPages = ref(1);
const loading = ref(true);

const loadHeaders = async () => {
  const res = await API.get("/candidates/headers");
  columns.value = res.data;
};
const loadData = async () => {
  loading.value = true;
  const res = await API.get(`/candidates?page=${page.value}&limit=4`);
  data.value = res.data.data;
  totalPages.value = res.data.totalPages;
  loading.value = false;
};
onMounted(async () => { await loadHeaders(); await loadData(); });
const goToPage = async (p: number) => { if (p < 1 || p > totalPages.value) return; page.value = p; await loadData(); };
const pages = () => Array.from({ length: totalPages.value }, (_, i) => i + 1);
</script>

<template>
  <div class="table-wrapper">
    <div v-if="loading" class="loading">Loading candidates…</div>
    <table v-else>
      <thead><tr><th v-for="col in columns" :key="col.accessor">{{ col.header }}</th></tr></thead>
      <tbody><tr v-for="row in data" :key="row.id"><td v-for="col in columns" :key="col.accessor">{{ row[col.accessor] }}</td></tr></tbody>
    </table>
    <div class="pagination" v-if="!loading && data.length > 0">
      <button @click="goToPage(page - 1)" :disabled="page === 1">‹</button>
      <button v-for="p in pages()" :key="p" @click="goToPage(p)" :class="{ active: p === page }">{{ p }}</button>
      <button @click="goToPage(page + 1)" :disabled="page === totalPages">›</button>
    </div>
  </div>
</template>

<style scoped>
.table-wrapper { height: 100%; display: flex; flex-direction: column; overflow: hidden; }
table { width: 100%; border-collapse: collapse; font-size: 12px; }
thead tr { background: #0f172a; }
th { padding: 6px 12px; text-align: left; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; white-space: nowrap; }
td { padding: 5px 12px; color: #cbd5e1; border-bottom: 1px solid #1e293b; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 180px; }
tr:hover td { background: #1e293b; }
.pagination { display: flex; gap: 4px; justify-content: center; padding: 6px 0 2px; flex-shrink: 0; }
.pagination button { background: #0f172a; color: #94a3b8; border: 1px solid #334155; border-radius: 6px; padding: 3px 8px; font-size: 12px; cursor: pointer; transition: background 0.2s; }
.pagination button:hover:not(:disabled) { background: #3b82f6; color: white; }
.pagination button.active { background: #3b82f6; color: white; border-color: #3b82f6; }
.pagination button:disabled { opacity: 0.3; cursor: not-allowed; }
.loading { color: #64748b; font-size: 13px; text-align: center; padding: 20px; }
</style>
