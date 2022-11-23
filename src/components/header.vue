<template>
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <router-link to="/">
        <a class="text-white font-bold uppercase text-2xl mr-4">Music</a>
      </router-link>

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <li @click.prevent="toggleModal" v-if="!user.isAuthenticated">
            <a class="px-2 text-white" href="#">Login / Register</a>
          </li>
          <li @click.prevent="onLogOut" v-else-if="user.isAuthenticated">
            <a class="px-2 text-white" href="#">Logout</a>
          </li>
          <router-link to="/manage">
            <span class="px-2 text-white">Manage</span>
          </router-link>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import { auth } from "@/plugins/firebase";
import { useModalStore } from "@/stores/modal";
import { useUserStore } from "@/stores/user";

export default {
  name: "page-header",
  setup() {
    const modal = useModalStore();
    const user = useUserStore();

    return {
      toggleModal: modal.toggleModal,
      user,
    };
  },
  methods: {
    async onLogOut() {
      await auth.signOut();
      this.user.logOut();
    },
  },
};
</script>
