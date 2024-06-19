<script setup lang="ts">
import HelloWorld from './components/Home.vue';
import { ref, computed } from 'vue';
import Routing from './components/Routing.vue';
import State from './components/State.vue';
import { getState, subscribe, usePiniaStore } from './store';
import Config from './components/Config.vue';
import { storeToRefs } from 'pinia';

const routes = {
  '/': HelloWorld,
  '/routing': Routing,
  '/state': State,
  '/config': Config,
};
const currentPath = ref(window.location.hash);

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash;
});

const currentView = computed(() => {
  const path = currentPath.value.slice(1) || '/';
  return routes[path as keyof typeof routes];
});

const cartValue = ref(getState().cart);

const store = usePiniaStore();
const { count } = storeToRefs(store);

subscribe(() => {
  cartValue.value = getState().cart;
});
</script>

<template>
  <p v-if="cartValue >= 1">Cart Value : {{ cartValue }}</p>
  <p v-if="count >= 1">Pinia Store Count : {{ count }}</p>
  <div>
    <a href="#/">Home</a> | <a href="#/routing">Routing</a> |
    <a href="#/state">State Management</a> | <a href="#/config">Config</a>
    <component :is="currentView" />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
