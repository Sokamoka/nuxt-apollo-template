import { GraphQLError } from 'graphql';
import bcrypt from 'bcryptjs';
import { User } from '../../mongodb/schema.js';
import { signToken } from '../../utils/token.js';

export const resolvers = {
  Mutation: {
    async registerUser(_, { registerInput: { username, email, password } }) {
      const existsUser = await User.findOne({ email });
      if (existsUser) {
        throw new GraphQLError(`A user already registred with the email ${email}`, {
          extensions: {
            code: 'USER_ALREADY_EXISTS',
          },
        });
      }

      const encryptedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        username,
        email: email.toLowerCase(),
        password: encryptedPassword,
      });

      const token = await signToken(newUser._id.toString());
      newUser.token = token;

      const res = await newUser.save();

      return {
        id: res.id,
        ...res._doc,
      };
    },

    async loginUser(_, { loginInput: { email, password } }) {
      const user = await User.findOne({ email });
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (user && isValidPassword) {
        const token = await signToken(user._id.toString());

        user.token = token;
        await user.save();

        return {
          id: user.id,
          ...user._doc,
        };
      } else {
        throw new GraphQLError('Incorrect password', {
          extensions: {
            code: 'INCORRECT_PASSWORD',
          },
        });
      }
    },
  },
};
