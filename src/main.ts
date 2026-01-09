import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { createBootstrap } from "bootstrap-vue-next";

// Bootstrap imports
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";

// Font Awesome - Bulk Import
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

// Custom styles
import './styles/main.scss';

// Add icons to library
library.add(fas, fab);

// Create Vue app
const app = createApp(App);

// Create and use Pinia store
const pinia = createPinia();

// Configure app
app.use(pinia);
app.use(createBootstrap());
app.use(router);

// Register global components
app.component('font-awesome-icon', FontAwesomeIcon);

// Global error handler
app.config.errorHandler = (error, instance, info) => {
  console.error('Global error:', error);
  console.error('Component instance:', instance);
  console.error('Error info:', info);
};

// Global warning handler
app.config.warnHandler = (msg, instance, trace) => {
  console.warn('Global warning:', msg);
  console.warn('Component instance:', instance);
  console.warn('Trace:', trace);
};

// Performance monitoring
if (import.meta.env.DEV) {
  app.config.performance = true;
}

// Ensure DOM is ready before mounting
const mountApp = () => {
  const appElement = document.getElementById('app');
  if (appElement) {
    app.mount('#app');
    console.log('✅ Fana Mind app mounted successfully');
  } else {
    console.error('❌ Could not find #app element');
  }
};

// Mount when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountApp);
} else {
  mountApp();
}
