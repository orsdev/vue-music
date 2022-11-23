import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      isAuthenticated: false,
    };
  },
  actions: {
    setIsAuthenticated() {
      this.isAuthenticated = true;
    },
    logOut() {
      this.isAuthenticated = false;
    },
  },
});
