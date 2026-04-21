import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../pages/Dashboard.vue";
import Login from "../pages/Login.vue";

const routes = [
  { path: "/login", component: Login },
  { path: "/", component: Dashboard },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


// 🔐 ADD IT HERE (after router creation, before export)
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  if (to.path !== "/login" && !token) {
    next("/login");
  } else {
    next();
  }
});


export default router;