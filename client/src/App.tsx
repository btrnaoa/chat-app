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
import Chat from './Chat';
import LoginPage from './components/LoginPage';
import { UserProvider } from './context/user-context';

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
  return (
    <ApolloProvider client={client}>
      <UserProvider>
        <Chat />
        <LoginPage />
      </UserProvider>
    </ApolloProvider>
  );
}
