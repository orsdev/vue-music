<template>
  <div class="bg-white rounded border border-gray-200 relative flex flex-col">
    <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
      <span class="card-title">Upload</span>
      <i class="fas fa-upload float-right text-green-400 text-2xl"></i>
    </div>
    <div class="p-6">
      <!-- Upload Dropbox -->
      <div
        class="w-full px-10 py-20 rounded text-center cursor-pointer border border-dashed border-gray-400 text-gray-400 transition duration-500 hover:text-white hover:bg-green-400 hover:border-green-400 hover:border-solid"
        :class="{
          'text-white bg-green-400 border-green-400 border-solid': is_dragover,
        }"
        @dragend.prevent.stop="is_dragover = false"
        @dragleave.prevent.stop="is_dragover = false"
        @dragenter.prevent.stop="is_dragover = true"
        @dragover.prevent.stop="is_dragover = true"
        @drop.prevent.stop="onUpload($event)"
      >
        <h5>Drop your files here</h5>
      </div>
      <hr class="my-6" />
      <!-- Progess Bars -->
      <div class="mb-4" v-for="upload in uploads" :key="upload.name">
        <!-- File Name -->
        <div class="font-bold text-sm" :class="upload.text_class">
          <i :class="upload.icon"></i>
          {{ upload.name }}
        </div>
        <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
          <!-- Inner Progress Bar -->
          <div
            class="transition-all progress-bar bg-blue-400"
            :class="upload.variant"
            :style="{ width: `${upload.current_progress}%` }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useToast } from "vue-toastification";
import { storage, auth, songs_collection } from "@/plugins/firebase";

export default {
  name: "manage-upload",
  setup() {
    const toast = useToast();

    return { toast };
  },
  props: {
    addSong: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      is_dragover: false,
      uploads: [] as {
        task: any;
        current_progress: number;
        name: string;
        variant: string;
        icon: string;
        text_class: string;
      }[],
    };
  },
  beforeUnmount() {
    this.uploads.forEach((upload: any) => {
      upload.task.cancel();
    });
  },
  methods: {
    onUpload(event: any) {
      const { files } = event.dataTransfer;
      const allFiles = [...files];

      this.is_dragover = false;

      allFiles.forEach((file) => {
        if (file.type !== "audio/mpeg") {
          this.toast.error("Only audio format supported!");
          return;
        }

        const storageRef = storage.ref();
        const songsRef = storageRef.child(`songs/${file.name}`);

        const task = songsRef.put(file);

        const uploadIndex =
          this.uploads.push({
            task,
            current_progress: 0,
            name: file.name,
            variant: "bg-blue-400",
            icon: "fas fa-spinner fa-spin",
            text_class: "",
          }) - 1;

        task.on(
          "state_changed",
          (snapshot: any) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

            this.uploads[uploadIndex].current_progress = progress;
          },
          () => {
            this.uploads[uploadIndex].variant = "bg-red-400";
            this.uploads[uploadIndex].text_class = "text-red-400";
            this.uploads[uploadIndex].icon = "fas fa-times";
          },
          async () => {
            const song: any = {
              uid: auth.currentUser?.uid as string,
              display_name: auth.currentUser?.displayName as string,
              original_name: task.snapshot.ref.name,
              modified_name: task.snapshot.ref.name,
              genre: "",
              comment_count: 0,
            };

            song.url = await task.snapshot.ref.getDownloadURL();
            const songRef = await songs_collection.add(song);
            const songSnapshot = await songRef.get();

            this.addSong(songSnapshot);

            this.uploads[uploadIndex].variant = "bg-green-400";
            this.uploads[uploadIndex].text_class = "text-green-400";
            this.uploads[uploadIndex].icon = "fas fa-check";
          }
        );
      });
    },
    // cancelUploads() {
    //   this.uploads.forEach((upload: any) => {
    //     upload.task.cancel();
    //   });
    // },
  },
};
</script>
