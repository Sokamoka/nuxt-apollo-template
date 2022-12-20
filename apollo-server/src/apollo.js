import { ApolloServer } from '@apollo/server';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { createContext } from './context.js';
import { authDirective } from './directives/authDirective.js';

export function configApollo(httpServer, typeDefs, resolvers) {
  const { authDirectiveTypeDefs, authDirectiveTransformer } = authDirective('auth');
  const directiveTransformers = [authDirectiveTransformer];

  let schema = makeExecutableSchema({ typeDefs: [authDirectiveTypeDefs, typeDefs], resolvers });
  schema = directiveTransformers.reduce((curSchema, transformer) => transformer(curSchema), schema);

  // Set up WebSocket server.
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });
  const serverCleanup = useServer(
    {
      schema,
      context: (ctx) => createContext(ctx.connectionParams?.Authorization),
    },
    wsServer
  );

  // Use Apollo Server as GraphQL middleware
  return new ApolloServer({
    schema,
    introspection: true,
    plugins: [
      // Proper shutdown for the HTTP server.
      ApolloServerPluginDrainHttpServer({ httpServer }),

      // Proper shutdown for the WebSocket server.
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });
}
