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
            >
              Submit
            </button>
          </vee-form>

          <!-- Registration Form -->
          <vee-form
            v-show="tab === 'register'"
            v-slot="{ setFieldValue }"
            @submit="onRegisterSubmit"
            :validation-schema="RegisterSchema"
            :initial-values="formValues"
          >
            <!-- Name -->
            <div class="mb-3">
              <label class="inline-block mb-2">Name</label>
              <vee-field
                name="name"
                type="text"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Enter Name"
              />
              <VeeErrorMessage name="name" className="text-red-500" />
            </div>
            <!-- Email -->
            <div class="mb-3">
              <label class="inline-block mb-2">Email</label>
              <vee-field
                name="email"
                type="email"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Enter Email"
              />
              <VeeErrorMessage name="email" className="text-red-500" />
            </div>
            <!-- Age -->
            <div class="mb-3">
              <label class="inline-block mb-2">Age</label>
              <vee-field
                name="age"
                type="number"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
              />
              <VeeErrorMessage name="age" className="text-red-500" />
            </div>
            <!-- Password -->
            <div class="mb-3">
              <label class="inline-block mb-2">Password</label>
              <vee-field
                name="password"
                type="password"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Password"
              />
              <VeeErrorMessage name="password" className="text-red-500" />
            </div>
            <!-- Confirm Password -->
            <div class="mb-3">
              <label class="inline-block mb-2">Confirm Password</label>
              <vee-field
                name="cPassword"
                type="password"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Confirm Password"
              />
              <VeeErrorMessage name="cPassword" className="text-red-500" />
            </div>
            <!-- Country -->
            <div class="mb-3">
              <label class="inline-block mb-2">Country</label>
              <vee-field
                as="select"
                name="country"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
              >
                <option value="">Select country</option>
                <option value="USA">USA</option>
                <option value="Mexico">Mexico</option>
                <option value="Germany">Germany</option>
              </vee-field>
              <VeeErrorMessage name="country" className="text-red-500" />
            </div>
            <!-- TOS -->
            <div class="mb-3 pl-6">
              <div>
                <vee-field name="tos" v-slot="{ field, validate }">
                  <input
                    type="checkbox"
                    class="w-4 h-4 float-left -ml-6 mt-1 rounded"
                    @change="$event => {
                      setFieldValue('tos', ($event.target as HTMLInputElement).checked)
                      validate();
                    }"
                    :value="field.value"
                  />
                </vee-field>
                <label class="inline-block">Accept terms of service</label>
              </div>
              <VeeErrorMessage name="tos" className="text-red-500" />
            </div>
            <button
              type="submit"
              class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
            >
              Submit
            </button>
          </vee-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useModalStore } from "@/stores/modal";
import * as yup from "yup";

const RegisterSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Email not valid").required(),
  age: yup.number().positive("Age is not valid").required("Enter your age"),
  country: yup.string().required("Select your country"),
  password: yup.string().required().min(8),
  cPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
  tos: yup
    .boolean()
    .oneOf([true, null], "Please accept the terms and condition"),
});

const LoginSchema = yup.object({
  email: yup.string().email("Email not valid").required(),
  password: yup.string().required().min(8),
});

interface IDataProps {
  tab: "login" | "register";
}

export default {
  name: "auth-modal",
  setup() {
    const modal = useModalStore();
    const formValues = {
      name: "",
      email: "",
      age: undefined,
      country: "",
      password: "",
      cPassword: "",
      tos: false,
    };

    return { modal, RegisterSchema, LoginSchema, formValues };
  },
  data(): IDataProps {
    return {
      tab: "login",
    };
  },
  methods: {
    onRegisterSubmit(values: any) {
      console.log(values);
    },
    onLoginSubmit(values: any) {
      console.log(values);
    },
  },
};
</script>
