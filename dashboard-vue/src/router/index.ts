import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { 
    path: "/login", 
    component: () => import("../pages/Login.vue")      // ✅ match EXACT filename
  },
  { 
    path: "/", 
    component: () => import("../pages/Dashboard.vue")   // ✅ match EXACT filename
  },
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