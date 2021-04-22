import {
  ApolloClient,
  ApolloProvider,
  DocumentNode,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { useState } from 'react';
import Chat from './Chat';
import Login from './Login';
import { User } from './common/types';

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
});

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/subscriptions',
  options: {
    reconnect: true,
  },
});

const splitLink = split(
  (operation: { query: DocumentNode }) => {
    const def = getMainDefinition(operation.query);
    return (
      def.kind === 'OperationDefinition' && def.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  return (
    <ApolloProvider client={client}>
      {user ? <Chat user={user} /> : <Login handleUser={setUser} />}
    </ApolloProvider>
  );
}
