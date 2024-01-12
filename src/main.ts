import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import VueDatGui from "@cyrilf/vue-dat-gui";
import App from "./App.vue";

import "@cyrilf/vue-dat-gui/dist/style.css";

const app = createApp(App);

app.use(createPinia());
app.use(VueDatGui);

app.mount("#app");
