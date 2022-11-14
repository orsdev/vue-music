<template>
  <PageHeader />
  <Home />
  <AuthModal />
</template>

<script lang="ts">
import PageHeader from "@/components/header.vue";
import AuthModal from "@/components/auth-modal.vue";
import Home from "@/views/home.vue";

export default {
  name: "App",
  components: {
    Home,
    PageHeader,
    AuthModal,
  },
};
</script>
