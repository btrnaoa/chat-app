import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { useEffect } from 'react';
import Chat from './Chat';
import NameForm from './components/NameForm';
import { UserProvider } from './context/user-context';

const link = new WebSocketLink({
  uri: `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${
    window.location.host
  }/subscriptions`,
  options: {
    reconnect: true,
  },
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default function App() {
  useEffect(
    () => () => {
      client.clearStore();
    },
    [],
  );
  return (
    <ApolloProvider client={client}>
      <UserProvider>
        <Chat />
        <NameForm />
      </UserProvider>
    </ApolloProvider>
  );
}
