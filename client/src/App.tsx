import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  Operation,
  split,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { useState } from 'react';
import Chat from './Chat';
import Login from './Login';
import type { Conversation, User } from './graphql/types.generated';

const serverUrl = process.env.REACT_APP_SERVER_URL;

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
  const [initialConversationId, setInitialConversationId] = useState<
    Conversation['id'] | null
  >(null);

  const context = {
    'user-id': currentUserId || '',
  };

  const httpLink = new HttpLink({
    uri: `${serverUrl}/graphql`,
    headers: context,
  });

  const wsLink = new WebSocketLink({
    uri: `${serverUrl?.replace(/^http/i, 'ws')}/subscriptions`,
    options: {
      reconnect: true,
      connectionParams: context,
    },
  });

  const splitLink = split(
    (operation: Operation) => {
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
      {currentUserId && initialConversationId ? (
        <Chat
          currentUserId={currentUserId}
          initialConversationId={initialConversationId}
        />
      ) : (
        <Login
          handleUser={(userId, conversationId) => {
            setCurrentUserId(userId);
            setInitialConversationId(conversationId);
          }}
        />
      )}
    </ApolloProvider>
  );
}
