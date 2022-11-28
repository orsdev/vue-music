<template>
  <Introduction />
  <section class="container mx-auto">
    <div class="bg-white rounded border border-gray-200 relative flex flex-col">
      <!-- Playlist -->
      <ol id="playlist">
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
          <span class="card-title">Songs</span>
          <!-- Icon -->
          <i
            class="fa fa-headphones-alt float-right text-green-400 text-xl"
          ></i>
        </div>
        <HomeContent v-for="song in songs" :key="song.docID" :song="song" />
      </ol>
    </div>
  </section>
  <Player />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Introduction from "@/components/home/introduction.vue";
import Player from "@/components/home/player.vue";
import HomeContent from "@/components/home/content.vue";
import { songs_collection } from "@/plugins/firebase";
import { useToast } from "vue-toastification";

export default defineComponent({
  name: "home-page",
  setup() {
    const toast = useToast();
    return { toast };
  },
  components: {
    Introduction,
    Player,
    HomeContent,
  },
  data() {
    return {
      songs: [] as any[],
    };
  },
  async created() {
    try {
      const snapshots = await songs_collection.get();
      snapshots.forEach((song: any) => {
        this.songs.push({
          ...song.data(),
          docID: song.id,
        });
      });
    } catch (error: any) {
      this.toast.error(error?.message || "something went wrong");
      return;
    }
  },
});
</script>
