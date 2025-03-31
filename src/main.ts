import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import "vuetify/styles"; // Import createPinia from pinia
import vuetify from "./plugins/vuetify"; // import Vuetify setup

const app = createApp(App);

// Create and use Pinia store
const pinia = createPinia();
app.use(pinia); // Use Pinia here
app.use(vuetify); // use Vuetify

app.use(router).mount("#app");
