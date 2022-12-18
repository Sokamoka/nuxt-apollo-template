import { useLocalStorage } from '@vueuse/core';

interface User {
  id: string;
  username: string;
  email: string;
}

const defaultState = {
  id: '',
  username: '',
  email: '',
};

export const useUserStore = defineStore('user', {
  state: () => ({ user: <User | null>useLocalStorage('user', defaultState) }),
  hydrate(state) {
    state.user = <User>useLocalStorage('user', defaultState);
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
    },

    queryUser() {
      const router = useRouter();
      const authStore = useAuthStore();

      const query = gql`
        query User($userId: ID!) {
          user(id: $userId) {
            id
            username
            email
          }
        }
      `;
      const variables = { userId: this.user?.id };
      const { onResult, onError } = useQuery(query, variables, {
        pollInterval: 1000 * 60,
      });

      onResult(({data}) => {
        this.updateUser(data?.user);
      });

      onError(({ networkError, graphQLErrors }) => {
        console.dir({ graphQLErrors });
        // console.dir(networkError?.result?.errors[0]?.extensions.code);
        const networkErrorCode = networkError?.result?.errors[0]?.extensions.code;
        if (networkErrorCode === 'INVALID_OR_EXPIRED_TOKEN') {
          console.log('TOKEN_EXPIRED');
          authStore.signOut();
          router.push('/sign-in');
        }
      });
    },
  },
});
