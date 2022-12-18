export const typeDefs = `#graphql
  type Query {
    user(id: ID!): User
    users: [User]
  }
`;
