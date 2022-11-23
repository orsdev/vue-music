import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/home.vue";
import ManageView from "@/views/manage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/manage",
      name: "manage",
      component: ManageView,
    },
  ],
});

export default router;
