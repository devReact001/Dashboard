<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import API from "../services/api";

const router = useRouter();
const user = ref<any>(null);
const notifications = ref<any[]>([]);
const currentDate = ref(new Date());
let timer: ReturnType<typeof setInterval>;

onMounted(async () => {
  timer = setInterval(() => { currentDate.value = new Date(); }, 1000);
  try {
    const [userRes, notifRes] = await Promise.all([
      API.get("/sidebar"),
      API.get("/sidebar/notifications"),
    ]);
    user.value = Array.isArray(userRes.data) ? userRes.data[0] : userRes.data;
    notifications.value = notifRes.data;
  } catch (e) { console.error("Sidebar error:", e); }
});

onUnmounted(() => clearInterval(timer));
const logout = () => { localStorage.removeItem("token"); router.push("/login"); };
const formatTime = (d: Date) => d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
const formatDate = (d: Date) => d.toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" });
</script>

<template>
  <div class="sidebar-card">
    <div class="sidebar-block welcome-block">
      <div class="block-label">Welcome User</div>
      <div class="username">{{ user?.name ?? "—" }}</div>
      <button class="logout-btn" @click="logout">Logout</button>
    </div>
    <div class="sidebar-block datetime-block">
      <div class="block-label">Date &amp; Time</div>
      <div class="datetime-value">{{ formatTime(currentDate) }}</div>
      <div class="datetime-date">{{ formatDate(currentDate) }}</div>
    </div>
    <div class="sidebar-block notif-block">
      <div class="block-label">Notifications</div>
      <div class="notif-list">
        <ul>
          <li v-for="(n, i) in notifications" :key="i">{{ n.message }}</li>
          <li v-if="notifications.length === 0" class="empty">No notifications</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sidebar-card { background: #1e293b; border-radius: 20px; padding: 20px; height: 100%; box-sizing: border-box; display: flex; flex-direction: column; gap: 16px; }
.sidebar-block { background: #0f172a; border-radius: 14px; padding: 16px; display: flex; flex-direction: column; align-items: center; gap: 8px; text-align: center; }
.block-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b; }
.username { background: #3b82f6; color: white; padding: 6px 14px; border-radius: 8px; font-size: 14px; font-weight: 600; }
.datetime-value { font-size: 26px; font-weight: 700; color: #e2e8f0; letter-spacing: 0.04em; }
.datetime-date { font-size: 12px; color: #94a3b8; }
.notif-block { flex: 1; align-items: flex-start; overflow: hidden; }
.notif-list { width: 100%; overflow-y: auto; }
ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; }
li { background: #1e293b; color: #cbd5e1; padding: 8px 10px; border-radius: 8px; font-size: 12px; text-align: left; line-height: 1.4; display: flex; align-items: flex-start; gap: 8px; }
li::before { content: ''; width: 6px; height: 6px; min-width: 6px; background: #3b82f6; border-radius: 50%; margin-top: 4px; }
li.empty { color: #475569; font-style: italic; }
li.empty::before { display: none; }
.logout-btn { margin-top: 4px; padding: 6px 14px; background: #ef4444; color: white; border: none; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; transition: background 0.2s; }
.logout-btn:hover { background: #dc2626; }
</style>
