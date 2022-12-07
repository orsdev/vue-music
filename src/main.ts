import { createApp } from "vue";
import { createPinia } from "pinia";
import VeeValidatePlugins from "@/plugins/validation";
import Toast from "vue-toastification";

import App from "./App.vue";
import router from "./router";
import { auth } from "./plugins/firebase";
import Icon from "./directives/icon";

import "./assets/main.css";
import "vue-toastification/dist/index.css";

const options = {
  timeout: 6000,
};

let app: any;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);

    app.use(createPinia());
    app.use(Toast, options);
    app.use(router);
    app.use(VeeValidatePlugins);
    app.directive("icon", Icon);
    app.mount("#app");
  }
});
