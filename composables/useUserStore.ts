import { useLocalStorage } from "@vueuse/core";

interface User {
  id: string;
  username: string;
  email: string;
}

const defaultState = () => ({
  id: '',
  username: '',
  email: '',
})

export const useUserStore = defineStore('user', {
  state: () => ({ user: <User | null>useLocalStorage("user", defaultState())  }),
  hydrate(state) {
    state.user = useLocalStorage("user",  defaultState());
  },
  getters: {
    getUser: (state) => state.user,
    isSignIn: (state) => Boolean(state.user?.id),
  },
  actions: {
    updateUser(payload: User) {
      this.user = payload;
    },

    resetUser() {
      this.user = null;
      // this.user = {
      //   id: '',
      //   username: '',
      //   email: '',
      // };
    },
  },
});
