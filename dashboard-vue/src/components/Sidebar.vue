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
/* Outer wrapper — white card */
.sidebar-card {
  background: #ffffff;
  border-radius: 20px;
  border: 1px solid #1e293b;
  padding: 12px;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: hidden;
  min-height: 0;
}

/* Shared gradient block */
.sidebar-block {
  border-radius: 14px;
  padding: 14px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
  overflow: hidden;
  color: #ffffff;
}
.block-label {
  font-size: 10.5px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: rgba(255, 255, 255, 0.65);
}

/* Welcome — light blue */
.welcome-block {
  flex: 0 0 auto;
  background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
  box-shadow: 0 6px 24px rgba(96, 165, 250, 0.4);
}
.username {
  background: rgba(255, 255, 255, 0.18);
  color: #ffffff;
  padding: 5px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
  border: 1px solid rgba(255, 255, 255, 0.22);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  margin-bottom: 4px;
}
.logout-btn {
  padding: 6px 16px;
  background: rgba(220, 38, 38, 0.8);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, transform 0.15s;
  flex-shrink: 0;
}
.logout-btn:hover { background: #dc2626; transform: translateY(-1px); }

/* Date/Time — sky blue */
.datetime-block {
  flex: 0 0 auto;
  background: linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%);
  box-shadow: 0 6px 24px rgba(56, 189, 248, 0.4);
}
.datetime-value {
  background: rgba(255, 255, 255, 0.18);
  color: #ffffff;
  padding: 5px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
  border: 1px solid rgba(255, 255, 255, 0.22);
}
.datetime-date { font-size: 12px; color: rgba(255, 255, 255, 0.7); }

/* Notifications — light indigo */
.notif-block {
  flex: 0 0 auto;
  height: 220px;
  background: linear-gradient(150deg, #818cf8 0%, #6366f1 100%);
  box-shadow: 0 6px 24px rgba(129, 140, 248, 0.4);
  border: 1px solid rgba(199, 210, 254, 0.2);
  align-items: stretch;
  justify-content: flex-start;
}
.notif-list {
  width: 100%;
  flex: 1 1 0;
  min-height: 0;
  overflow-y: auto;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 8px;
  scrollbar-width: thin;
  scrollbar-color: rgba(129, 140, 248, 0.3) transparent;
  box-sizing: border-box;
}
ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 6px; }
li {
  background: rgba(255, 255, 255, 0.07);
  color: rgba(255, 255, 255, 0.85);
  padding: 8px 10px;
  border-radius: 8px;
  font-size: 11.5px;
  text-align: left;
  line-height: 1.5;
  border-left: 3px solid #818cf8;
  display: flex;
  align-items: flex-start;
  gap: 8px;
  word-break: break-word;
  transition: background 0.15s;
}
li:hover { background: rgba(255, 255, 255, 0.12); }
li::before {
  content: '';
  width: 5px;
  height: 5px;
  min-width: 5px;
  background: #c7d2fe;
  border-radius: 50%;
  margin-top: 4px;
  flex-shrink: 0;
}
li.empty { color: rgba(255,255,255,0.4); font-style: italic; }
li.empty::before { display: none; }
</style>