<template>
  <PageHeader />
  <Home />
  <AuthModal />
</template>

<script lang="ts">
import PageHeader from "@/components/header.vue";
import AuthModal from "@/components/auth-modal.vue";
import Home from "@/views/home.vue";
import { useUserStore } from "@/stores/user";
import { auth } from "./plugins/firebase";

export default {
  name: "App",
  components: {
    Home,
    PageHeader,
    AuthModal,
  },
  setup() {
    const user = useUserStore();

    return { user };
  },
  created() {
    if (auth.currentUser) {
      this.user.setIsAuthenticated();
    }
  },
};
</script>
