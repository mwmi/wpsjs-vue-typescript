import "primeicons/primeicons.css";
import "./style.css";

import { createApp } from "vue";

import PrimeVue from "primevue/config";
import App from "./App.vue";
import router from "./router/index.ts";
import Noir from "./presets/Noir.ts";

const app = createApp(App);

app.use(router).use(PrimeVue, {
  theme: {
    preset: Noir,
  },
}).mount("#app");
