import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import {createBootstrap} from "bootstrap-vue-next";
//Bootstrap import
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const app = createApp(App);

// Create and use Pinia store
const pinia = createPinia();
app.use(pinia); // Use Pinia here
app.use(createBootstrap()); // Use BootstrapVue
app.use(router).mount("#app");
