export const useAuthStore = defineStore('auth', () => {
  const errorMessage = ref('');

  const router = useRouter();
  const { onLogin, onLogout } = useApollo();

  const userStore = useUserStore();

  interface RegisterCrendentials {
    username: string;
    email: string;
    password: string;
  }

  interface LoginCrendentials {
    email: string;
    password: string;
  }

  const signUp = (credentials: RegisterCrendentials) => {
    const query = gql`
      mutation Register($registerInput: RegisterInput) {
        registerUser(registerInput: $registerInput) {
          username
          email
          password
          token
        }
      }
    `;

    const { mutate, onDone, onError } = useMutation(query);

    onDone((result) => {
      console.log(result);
      router.push({ path: '/dashboard' });
    });

    onError((error) => {
      console.log('err:', error.message);
      errorMessage.value = error.message;
    });

    mutate({
      registerInput: {
        ...credentials,
      },
    });
  };

  const signIn = (credential: LoginCrendentials) => {
    errorMessage.value = '';
    const query = gql`
      mutation LoginUser($loginInput: LoginInput) {
        loginUser(loginInput: $loginInput) {
          id
          email
          username
          token
        }
      }
    `;

    const {
      error: signInError,
      mutate,
      onDone,
      onError,
    } = useMutation(query, () => ({
      variables: {
        loginInput: {
          ...credential,
        },
      },
    }));

    mutate({
      loginInput: {
        ...credential,
      },
    });

    onDone((result) => {
      const { id, username, email, token } = result.data?.loginUser || {};
      userStore.updateUser({ id, username, email });
      onLogin(token);
      router.push({ path: '/dashboard' });
    });

    onError((error) => {
      console.dir(signInError);
      console.dir(error.message);
      errorMessage.value = error.message;
    });
  };

  const signOut = () => {
    onLogout();
    userStore.resetUser();
  };

  return { errorMessage, signUp, signIn, signOut };
});
