import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia"; // Import createPinia from pinia

const app = createApp(App);

// Create and use Pinia store
const pinia = createPinia();
app.use(pinia); // Use Pinia here

app.use(router).mount("#app");
