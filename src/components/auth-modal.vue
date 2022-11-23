<template>
  <div
    class="fixed z-10 inset-0 overflow-y-auto"
    :class="modal.hiddenClass"
    id="modal"
  >
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen"
        >&#8203;</span
      >

      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      >
        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <div class="py-4 text-left px-6">
          <!--Title-->
          <div class="flex justify-between items-center pb-4">
            <p class="text-2xl font-bold">Your Account</p>
            <!-- Modal Close Button -->
            <div class="modal-close cursor-pointer z-50">
              <button @click.prevent="modal.toggleModal">
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>

          <!-- Tabs -->
          <ul class="flex flex-wrap mb-4">
            <li class="flex-auto text-center" @click.prevent="tab = 'login'">
              <a
                class="block rounded py-3 px-4 transition"
                :class="{ 'bg-blue-600 text-white': tab === 'login' }"
                href="#"
                >Login</a
              >
            </li>
            <li class="flex-auto text-center" @click.prevent="tab = 'register'">
              <a
                class="block rounded py-3 px-4 transition"
                :class="{ 'bg-blue-600 text-white': tab === 'register' }"
                href="#"
                >Register</a
              >
            </li>
          </ul>

          <!-- Login Form -->
          <AuthLogin :tab="tab" />

          <!-- Register From -->

          <AuthRegister :tab="tab" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useModalStore } from "@/stores/modal";
import AuthRegister from "@/components/register.vue";
import AuthLogin from "@/components/login.vue";

interface IDataProps {
  tab: "login" | "register";
}

export default {
  name: "auth-modal",
  setup() {
    const modal = useModalStore();

    return { modal };
  },
  components: {
    AuthRegister,
    AuthLogin,
  },
  data(): IDataProps {
    return {
      tab: "login",
    };
  },
};
</script>
