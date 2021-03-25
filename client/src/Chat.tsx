import { useState } from 'react';
import { gql, useMutation, useSubscription } from '@apollo/client';
import tw from 'twin.macro';
import ChatMessageList from './components/ChatMessageList';
import MessageInput from './components/MessageInput';
import Sidebar from './components/Sidebar';

const GET_MESSAGES = gql`
  subscription {
    messages {
      id
      timestamp
      user
      content
    }
  }
`;

const GET_USERS = gql`
  subscription {
    users
  }
`;

const CREATE_MESSAGE = gql`
  mutation($user: String!, $content: String!) {
    createMessage(user: $user, content: $content)
  }
`;

export default function Chat({ currentUser }: { currentUser: string }) {
  const [messageContent, setMessageContent] = useState('');
  const { data: messageData } = useSubscription(GET_MESSAGES);
  const { data: userData } = useSubscription(GET_USERS);
  const [createMessage] = useMutation(CREATE_MESSAGE);
  return (
    <div css={tw`flex w-full h-full`}>
      <Sidebar users={(userData && userData.users) || []} />
      <div css={tw`flex flex-col flex-1`}>
        <div css={tw`border-b border-gray-200 h-14`} />
        <div css={tw`flex flex-col flex-1 px-4 pb-4 overflow-hidden`}>
          <ChatMessageList
            messages={(messageData && messageData.messages) || []}
          />
          <MessageInput
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
            onSubmit={(e) => {
              e.preventDefault();
              createMessage({
                variables: { user: currentUser, content: messageContent },
              });
              setMessageContent('');
            }}
          />
        </div>
      </div>
    </div>
  );
}
