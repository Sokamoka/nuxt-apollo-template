import { User } from '../mongodb/schema.js';

export const context = async ({ req }) => {
  console.log('header:', req.headers.authorization);
  console.log('connection:', req.connection);
  const rawToken = req.headers.authorization;

  const token = formatToken(rawToken);

  const user = await User.findOne({ token });
  console.log(user?.id);

  return {
    token,
    userId: user?.id,
  };
};

const formatToken = (rawToken = '') => {
  return rawToken.startsWith('Bearer') ? rawToken.replace('Bearer ', '') : null;
};
