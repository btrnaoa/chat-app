import { ApolloServer, PubSub } from 'apollo-server-express';
import express, { Request, Response } from 'express';
import { createServer } from 'http';
import { resolve } from 'path';
import { createConnection, getRepository } from 'typeorm';
import config from './config';
import User from './entities/User';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';

const pubsub = new PubSub();

const subscriptions = {
  path: '/subscriptions',
  onConnect: (connectionParams: any) => {
    const { userId } = connectionParams;
    if (userId) {
      getRepository(User).update(userId, { isOnline: true });
      return {
        userId,
      };
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

createConnection()
  .then(() => {
    const app = express();
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      subscriptions,
      context: { pubsub },
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
  .catch((error) => console.log(error));
