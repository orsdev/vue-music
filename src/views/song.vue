<template>
  <div>
    <!-- Music Header -->
    <section class="w-full mb-8 py-14 text-center text-white relative">
      <div
        class="absolute inset-0 w-full h-full box-border bg-contain music-bg"
        style="background-image: url(/assets/img/song-header.png)"
      ></div>
      <div class="container mx-auto flex items-center">
        <!-- Play/Pause Button -->
        <button
          type="button"
          class="z-50 h-24 w-24 text-3xl bg-white text-black rounded-full focus:outline-none"
        >
          <i class="fas fa-play"></i>
        </button>
        <div class="z-50 text-left ml-8 max-w-[400px]">
          <!-- Song Info -->
          <div class="text-2xl font-bold">{{ song.modified_name }}</div>
          <div>{{ song.genre }}</div>
        </div>
      </div>
    </section>

    <!-- Form -->
    <section class="container mx-auto mt-6">
      <div
        class="bg-white rounded border border-gray-200 relative flex flex-col"
      >
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
          <!-- Comment Count -->
          <span class="card-title">Comments (15)</span>
          <i class="fa fa-comments float-right text-green-400 text-2xl"></i>
        </div>
        <div class="p-6">
          <vee-form
            @submit="handleSubmit"
            :validation-schema="validation_schema"
          >
            <vee-field
              as="textarea"
              name="comment"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded mb-1"
              placeholder="Your comment here..."
            ></vee-field>
            <div class="my-1">
              <VeeErrorMessage name="comment" className="text-red-500" />
            </div>
            <button
              type="submit"
              class="py-1.5 px-3 rounded text-white bg-green-600 block"
              :disabled="loading"
            >
              {{ loading ? "Please wait.." : "Submit" }}
            </button>
          </vee-form>
          <!-- Sort Comments -->
          <select
            class="block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          >
            <option value="1">Latest</option>
            <option value="2">Oldest</option>
          </select>
        </div>
      </div>
    </section>

    <!-- Comments -->
    <ul class="container mx-auto">
      <li class="p-6 bg-gray-50 border border-gray-200">
        <!-- Comment Author -->
        <div class="mb-5">
          <div class="font-bold">Elaine Dreyfuss</div>
          <time>5 mins ago</time>
        </div>

        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium der doloremque laudantium.
        </p>
      </li>
    </ul>

    <!-- Player -->
    <div class="fixed bottom-0 left-0 bg-white px-4 py-2 w-full"></div>
  </div>
</template>

<script lang="ts">
import {
  songs_collection,
  comments_collection,
  auth,
} from "@/plugins/firebase";
import { defineComponent } from "vue";
import { useToast } from "vue-toastification";

import * as yup from "yup";

const validation_schema = yup.object({
  comment: yup.string().required(),
});

export default defineComponent({
  name: "song-view",
  setup() {
    const toast = useToast();

    return { toast, validation_schema };
  },
  data() {
    return {
      song: {} as any,
      loading: false,
    };
  },
  mounted() {
    window.scrollTo(0, 20);
  },
  async created() {
    try {
      const song = await songs_collection
        .doc(this.$route.params.id as string)
        .get();

      if (!song.exists) {
        this.$router.push({ name: "home" });
        return;
      }

      this.song = song.data();
    } catch (error: any) {
      this.toast.error(error?.message || "something went wrong");
      return;
    }
  },
  methods: {
    async handleSubmit(values: any, { resetForm }: any) {
      this.loading = true;
      try {
        const comment = {
          content: values.comment,
          datePosted: new Date().toString(),
          sid: this.$route.params.id,
          name: auth.currentUser?.displayName,
          uid: auth.currentUser?.uid,
        };

        await comments_collection.add(comment);
        this.loading = false;

        this.toast.success("Comment added.");

        resetForm();
      } catch (error: any) {
        this.loading = false;
        this.toast.error(error?.message || "something went wrong");
        return;
      }
    },
  },
});
</script>
