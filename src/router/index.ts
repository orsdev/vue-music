import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/home.vue";
import ManageView from "@/views/manage.vue";
import NotFoundView from "@/views/404.vue";
import { auth } from "@/plugins/firebase";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        protected: false,
      },
    },
    {
      path: "/manage",
      name: "manage",
      component: ManageView,
      // beforeEnter: async (to, from) => {
      //   const canAccess = await auth.currentUser;
      //   if (!canAccess) return "/not-found";
      // },
      // redirect: "/not-found", Redirect to 404 page
      meta: {
        protected: true,
      },
    },
    {
      path: "/:catchAll(.*)*",
      name: "404",
      component: NotFoundView,
      meta: {
        protected: false,
      },
    },
  ],
});

router.beforeEach(async (to: any, from: any, next: any) => {
  const canAccess = await auth.currentUser;
  if (!canAccess && to.meta?.protected && to.name !== "home")
    next({ name: "home" });
  else next();
});

export default router;
