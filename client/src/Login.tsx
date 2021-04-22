import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import 'twin.macro';
import { User } from './common/types';
import Button from './components/Button';
import Container from './components/Container';

const CREATE_USER = gql`
  mutation($name: String!) {
    createUser(name: $name) {
      id
      name
    }
  }
`;

export default function Login({
  handleUser,
}: {
  handleUser: (user: User) => void;
}) {
  const [displayName, setDisplayName] = useState('');

  const [createUser] = useMutation<{ createUser: User }>(CREATE_USER, {
    onCompleted: ({ createUser: { id, name } }) => handleUser({ id, name }),
  });

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
