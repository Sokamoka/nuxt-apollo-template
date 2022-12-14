import { ApolloError } from '@apollo/client/core';
import { ErrorResponse } from '@apollo/client/link/error';
import { User } from '../types';

export const useUserStore = defineStore('user', () => {
  const user = useCookie<User>('user');

  const router = useRouter();
  const authStore = useAuthStore();

  const isSignIn = computed(() => Boolean(user.value?.id));

  const updateUser = (payload: User) => {
    user.value = payload;
  };

  const resetUser = () => {
    user.value = null;
  };

  const queryUser = () => {
    const query = gql`
      query User($userId: ID!) {
        user(id: $userId) {
          id
          username
          email
          role
        }
      }
    `;
    const variables = { userId: user.value?.id };
    const { onResult, onError } = useQuery(query, variables, {
      pollInterval: 1000 * 60,
    });

    onResult(({ data }) => {
      updateUser(data?.user);
    });

    onError((error: ErrorResponse | ApolloError) => {
      const { networkError, graphQLErrors } = error;
      console.dir({ graphQLErrors, networkError });
      // console.dir(networkError?.result?.errors[0]?.extensions.code);
      const networkErrorCode = networkError?.result?.errors[0]?.extensions.code;
      if (networkErrorCode === 'INVALID_OR_EXPIRED_TOKEN') {
        console.log('TOKEN_EXPIRED');
        authStore.signOut();
        router.push('/sign-in');
      }
    });
  };

  return {
    user,
    isSignIn,
    updateUser,
    resetUser,
    queryUser,
  };
});
