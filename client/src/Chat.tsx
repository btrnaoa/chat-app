import { useEffect, useState } from 'react';
import { gql, useMutation, useSubscription } from '@apollo/client';
import tw from 'twin.macro';
import ChatMessageList from './components/ChatMessageList';
import MessageInput from './components/MessageInput';
import Sidebar from './components/Sidebar';

const CREATE_MESSAGE = gql`
  mutation($userId: ID!, $content: String!, $conversationId: ID!) {
    createMessage(userId: $userId, content: $content, conversationId: $conversationId)
  }
`;

const CREATE_USER = gql`
  mutation($name: String!) {
    createUser(name: $name)
  }
`;

const MESSAGES_SUBSCRIPTION = gql`
  subscription {
    messages {
      id
      content
      createdAt
      user {
        id
        name
      }
    }
  }
`;

export default function Chat({ currentUser }: { currentUser: string }) {
  const [messageContent, setMessageContent] = useState('');

  const [createMessage] = useMutation(CREATE_MESSAGE);
  const [createUser, { data: { createUser: userId = 0 } = {} }] = useMutation(CREATE_USER);

  useEffect(() => {
    createUser({ variables: { name: currentUser } });
  }, [createUser, currentUser]);

  const { data: { messages = [] } = {} } = useSubscription(MESSAGES_SUBSCRIPTION);

  if (!userId) return null;

  return (
    <div css={tw`flex w-full h-full`}>
      <Sidebar users={[]} />
      <div css={tw`flex flex-col flex-1`}>
        <div css={tw`border-b border-gray-200 h-14`} />
        <div css={tw`flex flex-col flex-1 px-4 pb-4 overflow-hidden`}>
          <ChatMessageList messages={messages} />
          <MessageInput
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
            onSubmit={(e) => {
              e.preventDefault();
              createMessage({
                variables: { userId, content: messageContent, conversationId: 1 },
              });
              setMessageContent('');
            }}
          />
        </div>
      </div>
    </div>
  );
}
