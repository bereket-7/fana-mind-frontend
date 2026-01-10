import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      title: "Home - Fana Mind"
    }
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/AboutView.vue"),
    meta: {
      title: "About - Fana Mind"
    }
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("../components/UI/InstructorDashboard.vue"),
    meta: {
      title: "Dashboard - Fana Mind"
    }
  },
  // Catch all 404s
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../views/HomeView.vue"),
    meta: {
      title: "Page Not Found - Fana Mind"
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Update page title on route change
router.beforeEach((to, from, next) => {
  document.title = to.meta?.title as string || "Fana Mind";
  next();
});

export default router;
