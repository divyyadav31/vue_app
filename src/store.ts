import { defineStore } from 'pinia';
import { create } from 'zustand';

interface StoreState {
  cart: number;
}

const useStore = create<StoreState>((set) => ({
  cart: 0,
}));

export const usePiniaStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  actions: {
    increment() {
      this.count++;
    },
    decrement() {
      this.count >= 1 ? this.count-- : this.count;
    },
    removeAll() {
      this.count = 0;
    },
  },
});

export const { getState, setState, subscribe } = useStore;

export default useStore;
