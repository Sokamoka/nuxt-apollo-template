export const typeDefs = `#graphql
  type User {
    id: ID!
    username: String
    email: String!
    password: String
    token: String
  }

  input RegisterInput {
    username: String
    email: String
    password: String
  }

  input LoginInput {
    email: String
    password: String
  }

  type Mutation {
    registerUser(registerInput: RegisterInput): User
    loginUser(loginInput: LoginInput): User
  }
`;
