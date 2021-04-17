import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import 'twin.macro';
import { useUser } from '../context/user-context';
import Button from './Button';
import Container from './Container';

const CREATE_USER = gql`
  mutation($name: String!) {
    createUser(name: $name) {
      id
      name
    }
  }
`;

export default function LoginPage() {
  const [value, setValue] = useState('');
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
          createUser({ variables: { name: value } });
          setValue('');
        }}
      >
        <input
          tw="px-4 py-2 border rounded-full"
          name="displayName"
          type="text"
          placeholder="Display name"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <Button tw="ml-2">Enter</Button>
      </form>
    </Container>
  );
}
