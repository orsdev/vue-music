import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/home.vue";
import ManageView from "@/views/manage.vue";
import NotFoundView from "@/views/404.vue";

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
      // redirect: "/not-found", Redirect to 404 page
    },
    {
      path: "/:catchAll(.*)*",
      name: "404",
      component: NotFoundView,
    },
  ],
});

export default router;
