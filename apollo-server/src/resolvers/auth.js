import { GraphQLError } from 'graphql';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../../mongodb/schema.js';

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

      const token = jwt.sign(
        {
          user_id: newUser._id,
          email,
        },
        'UNSAFE_STRING',
        {
          expiresIn: '2h',
        }
      );

      newUser.token = token;

      const res = await newUser.save();

      return {
        id: res.id,
        ...res._doc,
      };
    },

    async loginUser(_, { loginInput: { email, password } }) {
      const user = await User.findOne({ email });

      if (user && bcrypt.compare(password, user.password)) {
        const token = jwt.sign(
          {
            user_id: user._id,
            email,
          },
          'UNSAFE_STRING',
          {
            expiresIn: '2h',
          }
        );

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
