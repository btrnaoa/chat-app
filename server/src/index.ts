import express, { Request, Response } from 'express';
import { ApolloServer, PubSub } from 'apollo-server-express';
import path from 'path';
import http from 'http';
import config from './config';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { pubsub: new PubSub() },
  subscriptions: {
    path: '/subscriptions',
  },
});

const app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve('../client/build')));
  app.get('*', (_req: Request, res: Response) => {
    res.sendFile(path.resolve('../client/build', 'index.html'));
  });
}

server.applyMiddleware({ app });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen(config.port, () =>
  console.log(`Server ready at http://localhost:${config.port}${server.graphqlPath}`),
);
