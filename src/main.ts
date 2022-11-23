import { createApp } from "vue";
import { createPinia } from "pinia";
import VeeValidatePlugins from "@/plugins/validation";
import Toast from "vue-toastification";

import App from "./App.vue";
import router from "./router";
import "./plugins/firebase";

import "./assets/main.css";
import "vue-toastification/dist/index.css";

const options = {
  timeout: 6000,
};

const app = createApp(App);

app.use(createPinia());
app.use(Toast, options);
app.use(router);
app.use(VeeValidatePlugins);
app.mount("#app");
