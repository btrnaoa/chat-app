import { gql, useLazyQuery, useQuery } from '@apollo/client';
import { useCallback, useState } from 'react';
import 'twin.macro';
import type { Conversation, Message, User } from '../common/types';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ConversationList from './ConversationList';
import MessageInput from './MessageInput';
import MessageList from './MessageList';
import UserList from './UserList';

const GET_CONVERSATION = gql`
  query GetConversation($id: ID!) {
    conversation(id: $id) {
      id
      name
      users {
        id
        name
      }
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

const MESSAGE_SUBSCRIPTION = gql`
  subscription MessageSubscription($conversationId: ID!) {
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

const FIND_CONVERSATION_BY_USER = gql`
  query FindConversationByUser($id: ID!) {
    conversation: findConversationByUser(id: $id) {
      id
    }
  }
`;

type ChatProps = {
  currentUserId: User['id'];
};

export default function Chat({ currentUserId }: ChatProps) {
  const [conversationId, setConversationId] = useState<
    Conversation['id'] | null
  >(null);

  const {
    data: {
      conversation: {
        name: conversationName = null,
        users: conversationUsers = [],
        messages = [],
      } = {},
    } = {},
    subscribeToMore,
  } = useQuery<{
    conversation: Conversation;
    newMessage: Message;
  }>(GET_CONVERSATION, {
    variables: { id: conversationId },
    skip: !conversationId,
  });

  const subscribeToNewMessages = useCallback(
    () =>
      subscribeToMore({
        document: MESSAGE_SUBSCRIPTION,
        variables: { conversationId },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          return {
            ...prev,
            conversation: {
              ...prev.conversation,
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

  const [findConversationByUser] = useLazyQuery<{
    conversation: Conversation | null;
  }>(FIND_CONVERSATION_BY_USER, {
    onCompleted: async ({ conversation }) => {
      setConversationId(conversation ? conversation.id : null);
    },
  });

  return (
    <div tw="flex min-h-screen">
      <Sidebar>
        <ConversationList
          currentUserId={currentUserId}
          handleClick={(id) => setConversationId(id)}
        />
        <UserList
          handleClick={(id) => {
            if (id === currentUserId) {
              return;
            }
            findConversationByUser({ variables: { id } });
          }}
        />
      </Sidebar>
      <div tw="flex flex-col flex-1">
        <Header>
          <h1 tw="text-lg">
            {conversationName ||
              conversationUsers
                .filter((user) => user.id !== currentUserId)
                .map((user) => user.name)
                .join(', ')}
          </h1>
        </Header>
        <div tw="flex flex-col flex-1 px-4 pb-4 overflow-hidden">
          <MessageList
            messages={messages}
            subscribeToNewMessages={
              conversationId ? subscribeToNewMessages : null
            }
          />
          <MessageInput conversationId={conversationId} />
        </div>
      </div>
    </div>
  );
}
