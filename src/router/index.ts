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
    path: "/courses",
    name: "courses",
    component: () => import("../views/CoursesView.vue"),
    meta: {
      title: "Courses - Fana Mind"
    }
  },
  {
    path: "/courses/:id",
    name: "course-detail",
    component: () => import("../views/CourseDetailView.vue"),
    meta: {
      title: "Course Details - Fana Mind"
    }
  },
  {
    path: "/courses/:id/learn",
    name: "course-learn",
    component: () => import("../views/CourseLearningView.vue"),
    meta: {
      title: "Learning - Fana Mind",
      requiresAuth: true
    }
  },
  {
    path: "/courses/:courseId/learn/:lessonId",
    name: "lesson-detail",
    component: () => import("../views/LessonView.vue"),
    meta: {
      title: "Lesson - Fana Mind",
      requiresAuth: true
    }
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("../components/UI/InstructorDashboard.vue"),
    meta: {
      title: "Dashboard - Fana Mind",
      requiresAuth: true
    }
  },
  {
    path: "/create-course",
    name: "create-course",
    component: () => import("../views/CreateCourseView.vue"),
    meta: {
      title: "Create Course - Fana Mind",
      requiresAuth: true,
      requiresRole: "instructor"
    }
  },
  {
    path: "/my-courses",
    name: "my-courses",
    component: () => import("../views/MyCoursesView.vue"),
    meta: {
      title: "My Courses - Fana Mind",
      requiresAuth: true
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
  
  // Check authentication requirements
  if (to.meta?.requiresAuth) {
    // In a real app, check if user is authenticated
    // For now, we'll just proceed
  }
  
  next();
});

export default router;
