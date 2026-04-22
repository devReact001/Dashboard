import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../pages/Dashboard.vue";
import Login from "../pages/Login.vue";

const routes = [
  { path: "/login", component: Login },
  { path: "/", component: Dashboard },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const token = localStorage.getItem("token");
  if (to.path !== "/login" && !token) return "/login";
});

export default router;
