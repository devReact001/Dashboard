<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import API from "../services/api";

const email = ref("");
const password = ref("");
const error = ref("");
const router = useRouter();

onMounted(() => {
  if (localStorage.getItem("token")) router.push("/");
});

const handleLogin = async () => {
  error.value = "";
  try {
    const res = await API.post("/auth/login", { email: email.value, password: password.value });
    localStorage.setItem("token", res.data.token);
    router.push("/");
  } catch (err: any) {
    error.value = err.response?.data?.message || "Login failed";
  }
};
</script>

<template>
  <div class="login-page">
    <div class="login-card">
      <div class="login-header">
        <div class="login-icon">◈</div>
        <h1>Welcome Back</h1>
        <p>Sign in to your dashboard</p>
      </div>
      <div class="form-group">
        <label>Email</label>
        <input v-model="email" type="email" placeholder="admin@example.com" @keyup.enter="handleLogin" />
      </div>
      <div class="form-group">
        <label>Password</label>
        <input v-model="password" type="password" placeholder="••••••••" @keyup.enter="handleLogin" />
      </div>
      <p v-if="error" class="error-msg">{{ error }}</p>
      <button class="login-btn" @click="handleLogin">Sign In</button>
    </div>
  </div>
</template>

<style scoped>
.login-page { min-height: 100vh; background: #0f172a; display: flex; align-items: center; justify-content: center; }
.login-card { background: #1e293b; border-radius: 20px; padding: 40px; width: 100%; max-width: 400px; box-shadow: 0 25px 60px rgba(0,0,0,0.4); }
.login-header { text-align: center; margin-bottom: 32px; }
.login-icon { font-size: 36px; color: #3b82f6; margin-bottom: 12px; }
h1 { color: #e2e8f0; font-size: 24px; font-weight: 700; margin: 0 0 6px; }
.login-header p { color: #64748b; font-size: 14px; margin: 0; }
.form-group { margin-bottom: 18px; }
label { display: block; color: #94a3b8; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 6px; }
input { width: 100%; background: #0f172a; border: 1px solid #334155; border-radius: 10px; padding: 12px 16px; color: #e2e8f0; font-size: 14px; outline: none; transition: border-color 0.2s; }
input:focus { border-color: #3b82f6; }
input::placeholder { color: #475569; }
.error-msg { color: #f87171; font-size: 13px; text-align: center; margin: -6px 0 12px; }
.login-btn { width: 100%; background: #3b82f6; color: white; border: none; border-radius: 10px; padding: 13px; font-size: 15px; font-weight: 600; cursor: pointer; margin-top: 8px; transition: background 0.2s; }
.login-btn:hover { background: #2563eb; }
</style>
