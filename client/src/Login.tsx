import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import tw from 'twin.macro';
import { User } from './common/types';
import Button from './components/Button';
import Container from './components/Container';

const Label = tw.label`flex flex-col`;

const Input = tw.input`px-4 py-2 mt-1 border rounded-full`;

const CREATE_USER = gql`
  mutation($name: String!, $conversationName: String!) {
    userId: createUser(name: $name, conversationName: $conversationName)
  }
`;

type InputStateProps = {
  conversationName: string;
  displayName: string;
};

const initialInputState: InputStateProps = {
  conversationName: '',
  displayName: '',
};

export default function Login({
  handleUser,
}: {
  handleUser: (userId: User['id']) => void;
}) {
  const [{ conversationName, displayName }, setInputState] = useState(
    initialInputState,
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [createUser] = useMutation<{ userId: User['id'] }>(CREATE_USER, {
    onCompleted: ({ userId }) => handleUser(userId),
  });

  return (
    <Container>
      <form
        tw="flex flex-col items-center"
        onSubmit={(event) => {
          event.preventDefault();
          createUser({
            variables: {
              conversationName,
              name: displayName,
            },
          });
        }}
      >
        <div tw="flex flex-col items-start space-y-2 text-gray-700">
          <Label>
            Display Name
            <Input
              name="displayName"
              type="text"
              placeholder="John Wick"
              value={displayName}
              onChange={handleInputChange}
              required
            />
          </Label>
          <Label>
            Conversation
            <Input
              name="conversationName"
              type="text"
              placeholder="General"
              value={conversationName}
              onChange={handleInputChange}
            />
          </Label>
        </div>
        <Button tw="mt-4">Enter</Button>
      </form>
    </Container>
  );
}
