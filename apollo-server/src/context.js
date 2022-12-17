import { GraphQLError } from 'graphql';
// import { User } from '../mongodb/schema.js';
import { verifyToken } from '../utils/token.js';

export const context = async ({ req }) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = getToken(authHeader);
    if (token) {
      try {
        const tokenData = await verifyToken(token);
        return {
          token,
          userId: tokenData.aud,
          userRole: tokenData.userRole,
        };
      } catch (error) {
        throw new GraphQLError('Invalid or Expired token', {
          extensions: {
            code: 'INVALID_OR_EXPIRED_TOKEN',
          },
        });
      }
      // const user = await User.findOne({ token });
    } else {
      throw new GraphQLError(`Authentication header must be 'Bearer [token]'`, {
        extensions: {
          code: 'MUST_BE_BEARER_TOKEN',
        },
      });
    }
  }

  return {};
};

const getToken = (rawToken = '') => {
  // return rawToken.split('Bearer ')[1];
  return rawToken.startsWith('Bearer') ? rawToken.replace('Bearer ', '') : null;
};
