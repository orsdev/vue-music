import { defineStore } from "pinia";

export const useModalStore = defineStore("modal", {
  state: () => {
    return {
      isOpen: false,
    };
  },
  getters: {
    hiddenClass(state): "" | "hidden" {
      return state.isOpen ? "" : "hidden";
    },
  },
  actions: {
    toggleModal() {
      this.isOpen = !this.isOpen;
    },
  },
});
