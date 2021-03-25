import express, { Request, Response } from 'express';
import path from 'path';
import http from 'http';
import { ApolloServer, gql, PubSub } from 'apollo-server-express';
import { v4 as uuid } from 'uuid';

const typeDefs = gql`
  type Message {
    id: ID!
    timestamp: String!
    user: String
    content: String!
  }

  type Query {
    messages: [Message!]
    users: [String!]
  }

  type Mutation {
    createMessage(user: String!, content: String!): ID!
  }

  type Subscription {
    messages: [Message!]
    users: [String!]
  }
`;

const messages = [];
const users = [];
const subscribers = [];

const updateSubscribers = () => subscribers.forEach((callback) => callback());

const createMessage = (user, content) => {
  const id = uuid();
  const timestamp = Date.now();
  return {
    id,
    timestamp,
    user,
    content,
  };
};

const resolvers = {
  Query: {
    messages: () => messages,
    users: () => users,
  },
  Mutation: {
    createMessage: (_parent, { user, content }) => {
      const message = createMessage(user, content);
      messages.push(message);
      updateSubscribers();
      return message.id;
    },
  },
  Subscription: {
    messages: {
      subscribe: (_parent, _args, { pubsub }) => {
        const channel = Math.random().toString(36).slice(2, 15);
        const publish = () => pubsub.publish(channel, { messages });
        subscribers.push(publish);
        setTimeout(publish, 0);
        return pubsub.asyncIterator(channel);
      },
    },
    users: {
      subscribe: (_parent, _args, { pubsub }) => {
        const channel = Math.random().toString(36).slice(2, 15);
        const publish = () => pubsub.publish(channel, { users });
        subscribers.push(publish);
        setTimeout(publish, 0);
        return pubsub.asyncIterator(channel);
      },
    },
  },
};

const subscriptions = {
  path: '/subscriptions',
  onConnect: (connectionParams, _webSocket, _context) => {
    const { user } = connectionParams as any;
    if (user) {
      messages.push(createMessage(null, `${user} has joined!`));
      users.push(user);
      updateSubscribers();
      return {
        user,
      };
    }
  },
  onDisconnect: async (_webSocket, context) => {
    const initContext = await context.initPromise;
    if (initContext) {
      const { user } = initContext;
      users.splice(users.indexOf(user), 1);
      updateSubscribers();
    }
  },
};

const app = express();
const pubsub = new PubSub();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  subscriptions,
  context: { pubsub },
});

const { NODE_ENV, PORT } = process.env;
const port = PORT || 4000;

if (NODE_ENV === 'production') {
  app.use(express.static(path.resolve('../client/build')));
  app.get('*', (_req: Request, res: Response) => {
    res.sendFile(path.resolve('../client/build', 'index.html'));
  });
}

server.applyMiddleware({ app });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen(port, () =>
  console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`),
);
