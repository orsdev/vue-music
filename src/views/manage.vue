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
