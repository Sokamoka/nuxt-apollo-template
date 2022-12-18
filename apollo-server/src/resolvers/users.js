import { User } from '../../mongodb/schema.js';

export const resolvers = {
  Query: {
    async user(_, { id }) {
      const user = await User.findById(id);
      return {
        id: user.id.toString(),
        ...user._doc,
      };
    },

    async users() {
      const users = await User.find({});
      return users;
    },
  },
};
