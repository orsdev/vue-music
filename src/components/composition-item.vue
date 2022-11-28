<template>
  <div class="border border-gray-200 p-3 mb-14 rounded">
    <div v-show="!toggleForm" class="flex">
      <h5 class="inline-block text-xl font-bold w-[90%]">
        {{ song.modified_name }}
      </h5>
      <div class="w-[70px]">
        <button
          class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
          @click.prevent="handleDelete"
        >
          <i class="fa fa-times"></i>
        </button>
        <button
          class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
          @click.prevent="toggleForm = true"
        >
          <i class="fa fa-pencil-alt"></i>
        </button>
      </div>
    </div>
    <div>
      <vee-form
        v-show="toggleForm"
        @submit="handleSubmit"
        :validation-schema="EditSchema"
        :initial-values="initial_values"
      >
        <div class="mb-3">
          <label class="inline-block mb-2">Song Title</label>
          <vee-field
            type="text"
            name="modified_name"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Song Title"
          />
          <div>
            <VeeErrorMessage name="modified_name" className="text-red-500" />
          </div>
        </div>
        <div class="mb-3">
          <label class="inline-block mb-2">Genre</label>
          <vee-field
            name="genre"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Genre"
          />
          <div>
            <VeeErrorMessage name="genre" className="text-red-500" />
          </div>
        </div>
        <div class="flex">
          <button
            type="submit"
            class="py-1.5 px-3 rounded text-white bg-green-600"
            :disabled="isLoading"
          >
            {{ isLoading ? "Please wait.." : "Submit" }}
          </button>
          <span class="mx-4 inline-block" />
          <button
            type="button"
            class="py-1.5 px-3 rounded text-white bg-gray-600"
            @click.prevent="toggleForm = false"
          >
            Go Back
          </button>
        </div>
      </vee-form>
    </div>
  </div>
</template>

<script lang="ts">
import { songs_collection, storage } from "@/plugins/firebase";
import { useToast } from "vue-toastification";
import * as yup from "yup";

const EditSchema = yup.object({
  modified_name: yup.string().required(),
  genre: yup.string().required(),
});

export default {
  name: "composition-item",
  setup(props) {
    const toast = useToast();
    const { modified_name, genre } = props.song as any;

    const initial_values = {
      modified_name: modified_name || "",
      genre: genre || "",
    };
    return { EditSchema, initial_values, toast };
  },
  data() {
    return {
      toggleForm: false,
      isLoading: false,
    };
  },
  props: {
    song: {
      type: Object,
      required: true,
    },
    updateSong: {
      type: Function,
      required: true,
    },
    removeDeletedSong: {
      type: Function,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  methods: {
    async handleSubmit(values: any) {
      this.isLoading = true;

      try {
        await songs_collection.doc(this.song.docID).update({
          ...values,
        });
        this.isLoading = false;
        this.toggleForm = false;

        this.updateSong(this.index, values);

        this.toast.success("Song updated successfully");
      } catch (error: any) {
        this.isLoading = false;
        this.toast.error(error?.message || "something went wrong");
        return;
      }
    },
    async handleDelete() {
      this.isLoading = true;

      try {
        const storageRef = storage.ref();
        const songsRef = storageRef.child(`songs/${this.song.original_name}`);

        await songsRef.delete();

        await songs_collection.doc(this.song.docID).delete();
        this.isLoading = false;
        this.toggleForm = false;

        this.removeDeletedSong(this.index);
        this.toast.success("Song deleted successfully");
      } catch (error: any) {
        this.isLoading = false;
        this.toast.error(error?.message || "something went wrong");
        return;
      }
    },
  },
};
</script>
