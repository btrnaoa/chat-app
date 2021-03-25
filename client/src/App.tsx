import { useMemo, useState } from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import tw from 'twin.macro';
import Chat from './Chat';
import NameForm from './components/NameForm';

const initialInputState = {
  displayName: '',
};

export default function App() {
  const [inputState, setInputState] = useState(initialInputState);
  const [currentUser, setCurrentUser] = useState('');
  const client = useMemo(() => {
    const link = new WebSocketLink({
      uri: `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${
        window.location.host
      }/subscriptions`,
      options: {
        reconnect: true,
        connectionParams: {
          user: currentUser,
        },
      },
    });
    return new ApolloClient({
      link,
      cache: new InMemoryCache(),
    });
  }, [currentUser]);
  return (
    <div css={tw`flex items-center justify-center h-screen`}>
      {currentUser ? (
        <ApolloProvider client={client}>
          <Chat currentUser={currentUser} />
        </ApolloProvider>
      ) : (
        <NameForm
          value={inputState.displayName}
          onChange={(e) => {
            const { name, value } = e.target;
            setInputState({ ...inputState, [name]: value });
          }}
          onSubmit={(e) => {
            e.preventDefault();
            setCurrentUser(inputState.displayName);
          }}
        />
      )}
    </div>
  );
}
