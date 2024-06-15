<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import { ref, computed } from "vue";
import Routing from "./components/Routing.vue";
import State from "./components/State.vue";

const routes = { "/": HelloWorld, "/routing": Routing, "/state": State };
const currentPath = ref(window.location.hash);

window.addEventListener("hashchange", () => {
  currentPath.value = window.location.hash;
});

const currentView = computed(() => {
  const path = currentPath.value.slice(1) || "/";
  return routes[path as keyof typeof routes];
});
</script>

<template>
  <div>
    <a href="#/">HelloWorld</a> | <a href="#/routing">Routing</a> |
    <a href="#/state">State Management</a>
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
