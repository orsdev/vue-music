<template>
  <Introduction />
  <HomeContent />
  <Player />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Introduction from "@/components/home/introduction.vue";
import Player from "@/components/home/player.vue";
import HomeContent from "@/components/home/content.vue";

export default defineComponent({
  name: "home-page",
  components: {
    Introduction,
    Player,
    HomeContent,
  },
});
</script>
