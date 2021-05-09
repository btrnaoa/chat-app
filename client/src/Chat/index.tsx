import { gql, useQuery } from '@apollo/client';
import { useCallback, useState } from 'react';
import 'twin.macro';
import { Conversation, Message, User } from '../common/types';
import Container from '../components/Container';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import useCreateConversation from '../hooks/useCreateConversation';
import ConversationList from './ConversationList';
import MessageInput from './MessageInput';
import MessageList from './MessageList';
import UserList from './UserList';

const GET_CONVERSATION = gql`
  query($userId: ID!, $conversationId: ID) {
    conversation(userId: $userId, conversationId: $conversationId) {
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

export default function Chat({ currentUserId }: { currentUserId: User['id'] }) {
  const [conversationId, setConversationId] = useState<
    Conversation['id'] | null
  >(null);

  const createConversation = useCreateConversation();

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
    variables: { conversationId, userId: currentUserId },
    onCompleted: ({ conversation }) => setConversationId(conversation.id),
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

  return (
    <Container>
      <div tw="flex w-full h-full">
        <Sidebar>
          <ConversationList
            currentUserId={currentUserId}
            handleClick={(id) => setConversationId(id)}
          />
          <UserList
            handleClick={async (id) => {
              if (id === currentUserId) return;
              const { data } = await createConversation([id, currentUserId]);
              if (data) {
                setConversationId(data.conversationId);
              }
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
              subscribeToNewMessages={subscribeToNewMessages}
            />
            <MessageInput
              conversationId={conversationId}
              userId={currentUserId}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}
