export const resolvers = {
  Mutation: {
    registerUser(_, { registerInput: { username, email, password } }) {
      return {
        id: 'abcdefg',
        username,
        email,
        password,
        token: 'xxxxxxxx',
      };
    },

    loginUser(_, { loginInput: { email, password } }) {
      return {
        id: 'abcdefg',
        username: 'xxx',
        email,
        password,
        token: 'xxxxxxxx',
      };
    },
  },
};
