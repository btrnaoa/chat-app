import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import tw from 'twin.macro';
import { useUser } from '../context/user-context';
import Button from './Button';

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
    onCompleted: ({ createUser: { id, name } }) =>
      setUser({ id: Number(id), name }),
  });
  if (user) return null;
  return (
    <div css={tw`flex items-center justify-center h-screen`}>
      <form
        css={tw`flex`}
        onSubmit={(event) => {
          event.preventDefault();
          createUser({ variables: { name: value } });
          setValue('');
        }}
      >
        <input
          css={tw`px-4 py-2 border rounded-full`}
          name="displayName"
          type="text"
          placeholder="Display name"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <Button css={tw`ml-2`}>Enter</Button>
      </form>
    </div>
  );
}
