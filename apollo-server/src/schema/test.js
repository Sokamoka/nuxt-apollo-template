export const typeDefs = `#graphql
  type Query {
    currentNumber: Int
  }

  type Subscription {
    numberIncremented: Int @auth(requires: USER)
  }
`;
