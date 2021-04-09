import { ApolloServer, PubSub } from 'apollo-server-express';
import express, { Request, Response } from 'express';
import { createServer } from 'http';
import { resolve } from 'path';
import { createConnection } from 'typeorm';
import config from './config';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';

createConnection()
  .then(() => {
    const app = express();
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: { pubsub: new PubSub() },
      subscriptions: {
        path: '/subscriptions',
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
  .catch((error) => console.log(error));
