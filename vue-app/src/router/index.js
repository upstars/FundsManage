import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/register",
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/home",
    component: () => import("../views/Home.vue"),
    redirect: "/main",
    children: [
      {
        path: "/personal",
        name: "personal",
        component: () => import("../views/main/Personal.vue"),
      },
      {
        path: "/fundlist",
        name: "fundlist",
        component: () => import("../views/main/Fundlist.vue"),
      },
      {
        path: "/main",
        component: () => import("../views/main/Main.vue"),
      },
    ],
  },

  {
    path: "/:path(.*)",
    component: () => import("../views/404.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
