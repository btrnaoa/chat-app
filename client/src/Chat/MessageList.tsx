import { gql, useQuery } from '@apollo/client';
import { useCallback, useEffect } from 'react';
import 'twin.macro';
import { Message } from '../common/types';
import MessageItem from './MessageItem';

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

export default function MessageList({
  conversationId,
}: {
  conversationId: string;
}) {
  const {
    data: { conversation: { messages = [] } = {} } = {},
    refetch,
    subscribeToMore,
  } = useQuery<{ conversation: { messages: Message[] }; newMessage: Message }>(
    CONVERSATION_QUERY,
    {
      variables: { conversationId },
    },
  );

  useEffect(() => {
    refetch();
  }, [conversationId, refetch]);

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

  useEffect(() => {
    const unsubscribe = subscribeToNewMessages();
    return () => unsubscribe();
  }, [subscribeToNewMessages]);

  return (
    <div tw="flex flex-col-reverse h-full mb-4 overflow-hidden hover:overflow-y-auto">
      <ul>
        {messages.map(({ id, content, createdAt, user }) => (
          <MessageItem
            key={id}
            content={content}
            createdAt={createdAt}
            user={user}
          />
        ))}
      </ul>
    </div>
  );
}
