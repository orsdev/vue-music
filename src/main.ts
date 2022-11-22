import { createApp } from "vue";
import { createPinia } from "pinia";
import VeeValidatePlugins from "@/plugins/validation";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VeeValidatePlugins);

app.mount("#app");
