<template>
  <!-- Login Form -->
  <vee-form
    v-show="tab === 'login'"
    @submit="onLoginSubmit"
    :validation-schema="LoginSchema"
  >
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-field
        type="email"
        name="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <VeeErrorMessage name="email" className="text-red-500" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field
        type="password"
        name="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Password"
      />
      <VeeErrorMessage name="password" className="text-red-500" />
    </div>
    <button
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
      :disabled="loading"
    >
      {{ loading ? "Please wait.." : "Submit" }}
    </button>
  </vee-form>
</template>

<script lang="ts">
import { useModalStore } from "@/stores/modal";
import { useUserStore } from "@/stores/user";
import { auth } from "@/plugins/firebase";
import { useToast } from "vue-toastification";

import * as yup from "yup";

const LoginSchema = yup.object({
  email: yup.string().email("Email not valid").required(),
  password: yup.string().required().min(8),
});

export default {
  name: "auth-login",
  setup() {
    const modal = useModalStore();
    const user = useUserStore();
    const toast = useToast();

    return { modal, LoginSchema, toast, user };
  },
  props: ["tab"],
  data: function () {
    return {
      loading: false,
    };
  },
  methods: {
    async onLoginSubmit(values: any) {
      this.loading = true;
      try {
        await auth.signInWithEmailAndPassword(values.email, values.password);
        this.loading = false;
        this.user.setIsAuthenticated();
        this.modal.toggleModal();
      } catch (error: any) {
        this.toast.error(error?.message || "something went wrong");
        return;
      }
    },
  },
};
</script>
