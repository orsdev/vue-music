<template>
  <PageHeader />

  <AuthModal />
  <router-view></router-view>
  <Player v-if="Object.keys(player.current_song)?.length > 0" />
</template>

<script lang="ts">
import PageHeader from "@/components/header.vue";
import AuthModal from "@/components/auth-modal.vue";
import { useUserStore } from "@/stores/user";
import { auth } from "./plugins/firebase";
import Player from "@/components/home/player.vue";
import { usePlayerStore } from "./stores/player";

export default {
  name: "App",
  components: {
    PageHeader,
    AuthModal,
    Player,
  },
  setup() {
    const user = useUserStore();
    const player = usePlayerStore();

    return { user, player };
  },
  created() {
    if (auth.currentUser) {
      this.user.setIsAuthenticated();
    }
  },
};
</script>
