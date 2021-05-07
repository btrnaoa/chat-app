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
import { User } from './common/types';
import Chat from './Chat';
import Login from './Login';

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        usersOnline: {
          merge: false,
        },
      },
    },
  },
});

export default function App() {
  const [currentUserId, setCurrentUserId] = useState<User['id'] | null>(null);

  const wsLink = new WebSocketLink({
    uri: 'ws://localhost:4000/subscriptions',
    options: {
      reconnect: true,
      connectionParams: {
        userId: currentUserId,
      },
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
    cache,
    link: splitLink,
  });

  return (
    <ApolloProvider client={client}>
      {currentUserId ? (
        <Chat currentUserId={currentUserId} />
      ) : (
        <Login handleUser={setCurrentUserId} />
      )}
    </ApolloProvider>
  );
}
