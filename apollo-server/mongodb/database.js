import mongoose from 'mongoose';

const MONGODB = 'mongodb://localhost/authtest';

export const connectDb = () => {
  mongoose.connect(MONGODB, { useNewUrlParser: true }).then((context) => {
    console.log('MongoDB Connected on port:', context.connection.port);
  });
};
