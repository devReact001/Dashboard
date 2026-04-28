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
  const res = await API.get(`/candidates?page=${page.value}&limit=3`);
  data.value = res.data.data;
  totalPages.value = res.data.totalPages;
  loading.value = false;
};
onMounted(async () => { await loadHeaders(); await loadData(); });
const goToPage = async (p: number) => {
  if (p < 1 || p > totalPages.value) return;
  page.value = p;
  await loadData();
};
const pages = () => Array.from({ length: totalPages.value }, (_, i) => i + 1);
</script>

<template>
  <div class="table-wrapper">
    <div v-if="loading" class="loading">Loading candidates…</div>
    <table v-else>
      <thead>
        <tr>
          <th v-for="col in columns" :key="col.accessor">{{ col.header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in data" :key="row.id">
          <td v-for="col in columns" :key="col.accessor">{{ row[col.accessor] }}</td>
        </tr>
      </tbody>
    </table>
    <div class="pagination" v-if="!loading && data.length > 0">
      <button @click="goToPage(page - 1)" :disabled="page === 1">‹</button>
      <button
        v-for="p in pages()"
        :key="p"
        @click="goToPage(p)"
        :class="{ active: p === page }"
      >{{ p }}</button>
      <button @click="goToPage(page + 1)" :disabled="page === totalPages">›</button>
    </div>
  </div>
</template>

<style scoped>
/* table-wrapper layout controlled by parent :deep() in Dashboard.vue */
.table-wrapper {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Table — compact 10px font, 3 rows always visible */
table {
  width: 100%;
  border-collapse: collapse;
  flex-shrink: 0;
}

/* Royal blue header */
thead tr {
  background: linear-gradient(90deg, #1e40af 0%, #1d4ed8 100%);
}
th {
  padding: 4px 6px;
  text-align: left;
  font-size: 9px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.85);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  white-space: nowrap;
  border-bottom: none;
}

td {
  padding: 4px 6px;
  color: #334155;
  border-bottom: 1px solid #e2e8f0;
  font-size: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
}
tbody tr { transition: background 0.15s; }
tbody tr:hover td { background: #f1f5f9; }
tbody tr:last-child td { border-bottom: none; }

/* Pagination — pinned at bottom with margin-top: auto */
.pagination {
  margin-top: auto;
  display: flex;
  gap: 4px;
  justify-content: center;
  align-items: center;
  padding: 4px 6px;
  flex-shrink: 0;
  border-top: 1px solid #e2e8f0;
  background: #ffffff;
  border-radius: 0 0 20px 20px;
}
.pagination button {
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  background: #ffffff;
  color: #475569;
  border: 1px solid #cbd5e1;
  border-radius: 5px;
  font-size: 11px;
  font-weight: 500;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;
}
.pagination button:hover:not(:disabled) { background: #1d4ed8; color: #fff; border-color: #1d4ed8; }
.pagination button.active { background: #1e40af; color: #fff; border-color: #1e40af; }
.pagination button:disabled { opacity: 0.35; cursor: not-allowed; }

.loading { color: #64748b; font-size: 11px; text-align: center; padding: 16px; }
</style>