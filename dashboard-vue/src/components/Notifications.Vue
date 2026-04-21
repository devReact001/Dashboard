<script setup lang="ts">
import { ref, onMounted } from "vue";
import API from "../services/api";

const notifications = ref([]);

onMounted(async () => {
  const res = await API.get("/sidebar/notifications");
  notifications.value = res.data;
});
</script>

<template>
  <div class="card">
    <h3>Notifications</h3>

    <ul>
      <li v-for="(n, i) in notifications" :key="i">
        {{ n.message }}
      </li>
    </ul>
  </div>
</template>