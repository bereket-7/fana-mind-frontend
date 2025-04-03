import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import {createBootstrap} from "bootstrap-vue-next";
//Bootstrap import
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";


/* Font Awesome - Bulk Import */
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons' // All solid icons
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas, fab)
const app = createApp(App);

// Create and use Pinia store
const pinia = createPinia();
app.use(pinia); // Use Pinia here
app.use(createBootstrap()); // Use BootstrapVue
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router).mount("#app");
