<template>
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">
        <UploadVue ref="upload" :addSong="addSong" />
      </div>
      <div class="col-span-2">
        <div
          class="bg-white rounded border border-gray-200 relative flex flex-col"
        >
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">My Songs</span>
            <i
              class="fa fa-compact-disc float-right text-green-400 text-2xl"
            ></i>
          </div>
          <div class="p-6">
            <!-- Composition Items -->
            <CompositionItem
              v-for="(song, index) in songs"
              :key="song.docID"
              :index="index"
              :song="song"
              :updateSong="updateSong"
              :removeDeletedSong="removeDeletedSong"
            />
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Player -->
  <div
    class="fixed bottom-0 left-0 bg-white p-5 pb-4 text-left align-top w-full h-16"
  >
    <div class="relative">
      <!-- Play/Pause Button -->
      <div class="float-left w-7 h-7 leading-3">
        <button type="button">
          <i class="fa fa-play text-gray-500 text-xl"></i>
        </button>
      </div>
      <!-- Current Position -->
      <div
        class="float-left h-7 leading-3 text-gray-400 text-lg w-14 ml-5 mt-1"
      >
        <span class="player-currenttime">00:00</span>
      </div>
      <!-- Scrub -->
      <div class="float-left w-7 h-7 leading-3 ml-7 mt-2 player-scrub">
        <div
          class="absolute left-0 right-0 text-lg text-center mx-auto player-song-info"
        >
          <span class="song-title">Song Title</span> by
          <span class="song-artist">Artist</span>
        </div>
        <span
          class="block w-full h-2 rounded m-1 mt-2 bg-gray-200 relative cursor-pointer"
        >
          <span
            class="absolute top-neg-8 text-gray-800 text-lg"
            style="left: 50%"
          >
            <i class="fas fa-circle"></i>
          </span>
          <span
            class="block h-2 rounded bg-gradient-to-r from-green-500 to-green-400"
            style="width: 50%"
          ></span>
        </span>
      </div>
      <!-- Duration -->
      <div
        class="float-left h-7 leading-3 text-gray-400 text-lg w-14 ml-8 mt-1"
      >
        <span class="player-duration">03:06</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UploadVue from "@/components/manage/upload.vue";
import CompositionItem from "@/components/composition-item.vue";
import { songs_collection, auth } from "@/plugins/firebase";

export default defineComponent({
  name: "manage-page",
  components: {
    UploadVue,
    CompositionItem,
  },
  data() {
    return {
      songs: [] as any[],
    };
  },
  // Cancel http request using $Ref
  // beforeRouteLeave(to, from, next) {
  //   (this.$refs as any).upload.cancelUploads();
  //   next();
  // },
  async created() {
    const snapshot = await songs_collection
      .where("uid", "==", auth.currentUser?.uid)
      .get();

    snapshot.forEach(this.addSong);
  },
  methods: {
    updateSong(index: number, values: any) {
      this.songs[index] = { ...this.songs[index], ...values };
    },
    removeDeletedSong(index: number) {
      const songsRef = [...this.songs];
      songsRef.splice(index, 1);

      this.songs = songsRef;
    },
    addSong(songRef: any) {
      const song = {
        ...songRef.data(),
        docID: songRef.id,
      };

      this.songs.push(song);
    },
  },
});
</script>
