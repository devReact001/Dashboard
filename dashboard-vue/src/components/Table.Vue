<script setup lang="ts">
import { ref, onMounted } from "vue";
import API from "../services/api";

const data = ref([]);
const page = ref(1);

const fetchData = async () => {
  const res = await API.get(`/candidates?page=${page.value}&limit=5`);
  data.value = res.data.data;
};

onMounted(fetchData);
</script>

<template>
  <div class="card">
    <h3>Users Table</h3>

    <table>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
      </tr>

      <tr v-for="row in data" :key="row.id">
        <td>{{ row.id }}</td>
        <td>{{ row.first_name }}</td>
        <td>{{ row.email }}</td>
      </tr>
    </table>

    <div class="pagination">
      <button @click="page--; fetchData()" :disabled="page === 1">
        Prev
      </button>
      <button @click="page++; fetchData()">Next</button>
    </div>
  </div>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  border: 1px solid #ddd;
}

.pagination {
  margin-top: 10px;
}
</style>