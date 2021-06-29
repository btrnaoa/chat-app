import { ApolloServer } from 'apollo-server-express';
import express, { Request, Response } from 'express';
import { createServer } from 'http';
import { resolve } from 'path';
import { buildSchema } from 'type-graphql';
import Container from 'typedi';
import {
  createConnection,
  getConnectionOptions,
  getRepository,
  useContainer,
} from 'typeorm';
import config from './config';
import ConversationResolver from './graphql/resolvers/ConversationResolver';
import MessageResolver from './graphql/resolvers/MessageResolver';
import UserResolver from './graphql/resolvers/UserResolver';
import User from './models/User';

const subscriptions = {
  path: '/subscriptions',
  onConnect: (connectionParams: any) => {
    const userId = connectionParams['user-id'];
    if (userId) {
      getRepository(User).update(userId, { isOnline: true });
      return { userId };
    }
    return connectionParams;
  },
  onDisconnect: async (_: any, context: any) => {
    const ctx = await context.initPromise;
    if (ctx && ctx.userId) {
      getRepository(User).update(ctx.userId, { isOnline: false });
    }
  },
};

// Register 3rd party IoC container
useContainer(Container);

getConnectionOptions()
  .then((options) => {
    if (process.env.NODE_ENV === 'production') {
      return {
        ...options,
        url: process.env.DATABASE_URL,
      };
    }
    return options;
  })
  .then((options) =>
    createConnection(options)
      .then(async () => {
        const app = express();
        const schema = await buildSchema({
          resolvers: [ConversationResolver, MessageResolver, UserResolver],
          container: Container,
          emitSchemaFile: resolve(__dirname, 'schema.gql'),
        });
        const server = new ApolloServer({
          schema,
          subscriptions,
          context: ({ req, connection }) => {
            const context = connection ? connection.context : req.headers;
            const userId = context['user-id'] || '';
            return { userId };
          },
        });

        if (process.env.NODE_ENV === 'production') {
          app.use(express.static(resolve('../client/build')));
          app.get('*', (_req: Request, res: Response) => {
            res.sendFile(resolve('../client/build', 'index.html'));
          });
        }

        server.applyMiddleware({ app });

        const httpServer = createServer(app);
        server.installSubscriptionHandlers(httpServer);

        httpServer.listen(config.port, () =>
          console.log(
            `Server ready at http://localhost:${config.port}${server.graphqlPath}`,
          ),
        );
      })
      .catch((error) => console.log(error)),
  );
