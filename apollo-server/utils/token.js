import JWT from 'jsonwebtoken';

export const signToken = (userId, userRole = '') => {
  return new Promise((resolve, reject) => {
    const payload = {
      userRole,
    };
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const options = {
      expiresIn: '1h',
      issuer: process.env.ACCESS_TOKEN_ISSUER,
      audience: userId,
    };
    JWT.sign(payload, secret, options, (err, token) => {
      if (err) {
        return reject(err);
      }
      resolve(token);
    });
  });
};

export const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) {
        return reject(err);
      }
      resolve(payload);
    });
  });
};
