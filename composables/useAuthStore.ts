export const useAuthStore = defineStore('auth', () => {
  const errorMessage = ref('');
  const router = useRouter();
  const { onLogin } = useApollo();

  interface LoginCrendentials {
    email: string;
    password: string;
  }

  const signUp = () => {};

  const signIn = (credential: LoginCrendentials) => {
    errorMessage.value = '';
    const query = gql`
      mutation LoginUser($loginInput: LoginInput) {
        loginUser(loginInput: $loginInput) {
          email
          username
          token
        }
      }
    `;

    const { mutate, onDone, onError } = useMutation(query, () => ({
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
      console.log(result);
      const token = result.data?.loginUser?.token;
      onLogin(token);
      router.push({ path: '/dashboard' });
    });

    onError((error) => {
      console.dir(error);
      console.dir(error.message);
      errorMessage.value = error.message;
    });
  };

  

  const signOut = () => {};

  return { errorMessage, signUp, signIn, signOut };
});
