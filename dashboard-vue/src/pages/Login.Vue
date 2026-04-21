<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import API from "../services/api";

const email = ref("");
const password = ref("");
const error = ref("");
const router = useRouter();

const handleLogin = async () => {
  try {
    const res = await API.post("/auth/login", {
      email: email.value,
      password: password.value,
    });

    localStorage.setItem("token", res.data.token);

    router.push("/");
  } catch (err: any) {
    error.value = err.response?.data?.message || "Login failed";
  }
};
</script>

<template>
  <div style="padding: 40px; max-width: 400px; margin: auto">
    <h2>Login</h2>

    <input v-model="email" placeholder="Email" /><br /><br />
    <input v-model="password" type="password" placeholder="Password" /><br /><br />

    <button @click="handleLogin">Login</button>

    <p v-if="error" style="color: red">{{ error }}</p>
  </div>
</template>