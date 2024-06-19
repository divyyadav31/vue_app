import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { VueQueryPlugin } from '@tanstack/vue-query';
import { createPinia } from 'pinia';

const pinia = createPinia();

const queryClientOptions = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
};

const app = createApp(App);
app.use(pinia);
app.use(VueQueryPlugin, {
  queryClientConfig: queryClientOptions,
});

app.mount('#app');
