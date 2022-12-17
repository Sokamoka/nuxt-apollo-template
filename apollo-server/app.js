import { connectDb } from './mongodb/database.js';
import createHttpServer from './src/server.js';
import * as dotenv from 'dotenv';

dotenv.config();

// Create Express server
const port = 4005;
const server = createHttpServer();

connectDb();

// Start Express server
server.listen({ port }, () => {
  console.log(`Started server on port: ${port}`);
  console.log(`🚀 Apollo Server ready at http://localhost:${port}/graphql`);
  console.log(`🚀 Subscription endpoint ready at ws://localhost:${port}/graphql`);
});
