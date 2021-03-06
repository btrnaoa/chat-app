import { useCallback, useState } from 'react';
import 'twin.macro';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import {
  OnNewMessageDocument,
  useGetConversationQuery,
  useStartConversationMutation,
} from '../graphql/hooks.generated';
import ConversationList from './ConversationList';
import MessageInput from './MessageInput';
import MessageList from './MessageList';
import UserList from './UserList';
import type {
  Conversation,
  OnNewMessageSubscription,
  OnNewMessageSubscriptionVariables,
  User,
} from '../graphql/types.generated';

type ChatProps = {
  currentUserId: User['id'];
  initialConversationId: Conversation['id'];
};

export default function Chat({
  currentUserId,
  initialConversationId,
}: ChatProps) {
  const [conversationId, setConversationId] = useState(initialConversationId);

  const {
    data: { conversation } = {},
    subscribeToMore,
  } = useGetConversationQuery({
    variables: { id: conversationId },
    fetchPolicy: 'cache-and-network',
  });

  const subscribeToNewMessages = useCallback(
    () =>
      subscribeToMore<
        OnNewMessageSubscription,
        OnNewMessageSubscriptionVariables
      >({
        document: OnNewMessageDocument,
        variables: { conversationId },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data || !prev.conversation) {
            return prev;
          }
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

  const [startConversation] = useStartConversationMutation({
    onCompleted: (data) => setConversationId(data.conversationId),
  });

  return (
    <div tw="flex h-screen">
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
            startConversation({ variables: { userId: id } });
          }}
        />
      </Sidebar>
      <div tw="flex flex-col flex-1">
        <Header>
          <h1>
            {conversation &&
              (conversation.name ||
                conversation.users
                  .filter((user) => user.id !== currentUserId)
                  .map((user) => user.name)
                  .join(', '))}
          </h1>
        </Header>
        <div tw="flex flex-col flex-1 px-4 pb-4 overflow-hidden">
          <MessageList
            messages={conversation ? conversation.messages : []}
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
