import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import 'twin.macro';
import Button from './components/Button';
import Container from './components/Container';
import { useUser } from './context/user-context';

const CREATE_USER = gql`
  mutation($name: String!) {
    createUser(name: $name) {
      id
      name
    }
  }
`;

export default function Login() {
  const [displayName, setDisplayName] = useState('');
  const { user, setUser } = useUser();

  const [createUser] = useMutation(CREATE_USER, {
    onCompleted: ({ createUser: { id, name } }) => setUser({ id, name }),
  });

  if (user) return null;
  return (
    <Container>
      <form
        tw="flex"
        onSubmit={(event) => {
          event.preventDefault();
          createUser({ variables: { name: displayName } });
          setDisplayName('');
        }}
      >
        <input
          tw="px-4 py-2 border rounded-full"
          name="displayName"
          type="text"
          placeholder="Display name"
          value={displayName}
          onChange={(event) => setDisplayName(event.target.value)}
        />
        <Button tw="ml-2">Enter</Button>
      </form>
    </Container>
  );
}
