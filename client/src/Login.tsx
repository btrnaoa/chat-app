import { useState } from 'react';
import tw from 'twin.macro';
import Button from './components/Button';
import Container from './components/Container';
import { useLoginUserMutation } from './graphql/hooks.generated';
import type { Conversation, User } from './graphql/types.generated';

const Label = tw.label`flex flex-col`;

const Input = tw.input`px-4 py-2 mt-1 border rounded-full`;

type InputStateProps = {
  conversationName: string;
  displayName: string;
};

const initialInputState: InputStateProps = {
  conversationName: '',
  displayName: '',
};

type LoginProps = {
  handleUser: (userId: User['id'], conversationId: Conversation['id']) => void;
};

export default function Login({ handleUser }: LoginProps) {
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

  const [loginUser] = useLoginUserMutation({
    onCompleted: ({ userConversation }) => {
      if (userConversation) {
        handleUser(userConversation.user.id, userConversation.conversation.id);
      }
    },
  });

  return (
    <Container>
      <form
        tw="flex flex-col items-center"
        onSubmit={(event) => {
          event.preventDefault();
          loginUser({
            variables: {
              username: displayName,
              conversationName: conversationName || undefined,
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
