import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { createServer } from 'http';
import { expressMiddleware } from '@apollo/server/express4';
import { configApollo } from './apollo.js';
import { context } from './context.js';
import { typeDefs } from './schema/index.js';
import { resolvers } from './resolvers/index.js';

export default function createHttpServer() {
  console.log('Creating server...');
  const app = express();

  // Create an Express app and HTTP server; we will attach the WebSocket
  // server and the ApolloServer to this HTTP server.
  const httpServer = createServer(app);

  // Error handling route
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

  // authResolvers(resolvers);
  const apolloServer = configApollo(httpServer, typeDefs, resolvers);

  async function startApolloServer() {
    await apolloServer.start();

    // Initiate Apollo server middleware
    app.use(
      '/graphql',
      cors(),
      bodyParser.json(),
      expressMiddleware(apolloServer, {
        context,
        // context: ({ req }) => {
        //   // console.log('req:', req.headers);
        //   const user = req.headers.user ? JSON.parse(req.headers.user) : null;
        //   return { user };
        // },
      })
    );
  }
  startApolloServer();

  return httpServer;
}
