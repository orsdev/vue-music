import { defineStore } from "pinia";

export const useUserStore = defineStore("modal", {
  state: () => {
    return {
      user: null,
      isAuthenticated: false,
    };
  },
  actions: {
    signIn(payload: any) {
      this.user = payload;
      this.isAuthenticated = true;
    },
    logOut() {
      this.user = null;
      this.isAuthenticated = false;
    },
  },
});
