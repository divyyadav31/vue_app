<script setup lang="ts">
import { ref } from 'vue';
import { getState, setState, subscribe, usePiniaStore } from '../store';
import { storeToRefs } from 'pinia';

const cartValue = ref(getState().cart);
function increase() {
  setState({ cart: getState().cart + 1 });
}
function decrease() {
  setState({
    cart: getState().cart >= 1 ? getState().cart - 1 : getState().cart,
  });
}
function remove() {
  setState({
    cart: 0,
  });
}

const store = usePiniaStore();
</script>

<template>
  <div
    style="
      display: flex;
      margin: 10px;
      gap: 4px;
      align-items: center;
      justify-content: center;
    "
  >
    <button @click="increase">Increase</button>
    <button @click="decrease">Decrease</button>
    <button @click="remove">Remove All</button>
  </div>

  <div
    style="
      display: flex;
      margin: 10px;
      gap: 4px;
      align-items: center;
      justify-content: center;
    "
  >
    <button @click="store.increment">Increment in Pinia Store Count</button>
    <button @click="store.decrement">Decrement in Pinia Store Count</button>
    <button @click="store.removeAll">Empty the Pinia Store Count</button>
  </div>
</template>
