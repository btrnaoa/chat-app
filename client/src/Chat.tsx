import { gql, useMutation, useQuery } from '@apollo/client';
import { useCallback, useState } from 'react';
import tw from 'twin.macro';
import ChatMessageList from './components/ChatMessageList';
import MessageInput from './components/MessageInput';
import Sidebar from './components/Sidebar';
import { useUser } from './context/user-context';

const CREATE_MESSAGE = gql`
  mutation($conversationId: ID!, $userId: ID!, $content: String!) {
    createMessage(
      conversationId: $conversationId
      userId: $userId
      content: $content
    )
  }
`;

const CONVERSATION_QUERY = gql`
  query($conversationId: ID!) {
    conversation(conversationId: $conversationId) {
      id
      messages {
        id
        content
        createdAt
        user {
          name
        }
      }
    }
  }
`;

const MESSAGES_SUBSCRIPTION = gql`
  subscription($conversationId: ID!) {
    newMessage(conversationId: $conversationId) {
      id
      content
      createdAt
      user {
        name
      }
    }
  }
`;

export default function Chat() {
  const [conversationId] = useState(1);

  const { user } = useUser();

  const [createMessage] = useMutation(CREATE_MESSAGE);

  const { data, subscribeToMore } = useQuery(CONVERSATION_QUERY, {
    variables: { conversationId },
  });

  const subscribeToNewMessages = useCallback(
    () =>
      subscribeToMore({
        document: MESSAGES_SUBSCRIPTION,
        variables: { conversationId },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          return {
            ...prev,
            conversation: {
              messages: [
                ...prev.conversation.messages,
                subscriptionData.data.newMessage,
              ],
            },
          };
        },
      }),
    [conversationId, subscribeToMore],
  );

  return (
    user && (
      <div css={tw`flex items-center justify-center h-screen`}>
        <div css={tw`flex w-full h-full`}>
          <Sidebar users={[]} />
          <div css={tw`flex flex-col flex-1`}>
            {/* Chat header placeholder */}
            <div css={tw`border-b border-gray-200 h-14`} />

            <div css={tw`flex flex-col flex-1 px-4 pb-4 overflow-hidden`}>
              <ChatMessageList
                messages={
                  (data && data.conversation && data.conversation.messages) ||
                  []
                }
                subscribeToNewMessages={subscribeToNewMessages}
              />
              <MessageInput
                handleMessage={(content) =>
                  createMessage({
                    variables: {
                      conversationId,
                      content,
                      userId: user.id,
                    },
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>
    )
  );
}
