<template>
  <Introduction />
  <section class="container mx-auto">
    <div class="bg-white rounded border border-gray-200 relative flex flex-col">
      <!-- Playlist -->
      <ol id="playlist">
        <div
          class="px-6 pt-6 pb-5 font-bold border-b border-gray-200"
          v-icon="'fa-headphones-alt'"
        >
          <span class="card-title">Songs</span>
        </div>
        <HomeContent v-for="song in songs" :key="song.docID" :song="song" />
      </ol>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Introduction from "@/components/home/introduction.vue";
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
    HomeContent,
  },
  data() {
    return {
      songs: [] as any[],
      maxPerPage: 25,
      pendingRequest: false,
    };
  },
  async created() {
    this.getSongs();

    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      const { scrollTop, offsetHeight } = document.documentElement;
      const { innerHeight } = window;

      const bottomOfWindow =
        Math.round(scrollTop) + innerHeight === offsetHeight;

      if (bottomOfWindow) {
        this.getSongs();
      }
    },
    async getSongs() {
      if (this.pendingRequest) return;

      this.pendingRequest = true;

      try {
        let snapshots;

        if (this.songs.length) {
          const lastDoc = await songs_collection
            .doc(this.songs[this.songs.length - 1].docID)
            .get();
          snapshots = await songs_collection
            .orderBy("modified_name")
            .startAfter(lastDoc)
            .limit(this.maxPerPage)
            .get();
        } else {
          snapshots = await songs_collection
            .orderBy("modified_name")
            .limit(this.maxPerPage)
            .get();
        }

        snapshots.forEach((song: any) => {
          this.songs.push({
            ...song.data(),
            docID: song.id,
          });
        });

        this.pendingRequest = false;
      } catch (error: any) {
        this.toast.error(error?.message || "something went wrong");
        return;
      }
    },
  },
});
</script>
