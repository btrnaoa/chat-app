import { gql, useMutation, useQuery } from '@apollo/client';
import { useCallback, useEffect, useState } from 'react';
import 'twin.macro';
import { Channel } from '../common/types';
import Container from '../components/Container';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { useUser } from '../context/user-context';
import MessageInput from './MessageInput';
import MessageList from './MessageList';

const CREATE_MESSAGE = gql`
  mutation($conversationId: ID!, $userId: ID!, $content: String!) {
    createMessage(
      conversationId: $conversationId
      userId: $userId
      content: $content
    )
  }
`;

const CHANNEL_QUERY = gql`
  query {
    channels {
      id
      name
      conversation {
        id
      }
    }
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
  const [conversationId, setConversationId] = useState('1');

  const { user } = useUser();

  const [createMessage] = useMutation(CREATE_MESSAGE);

  const { data: { channels = [] } = {} } = useQuery(CHANNEL_QUERY);

  const {
    data: { conversation: { messages = [] } = {} } = {},
    refetch,
    subscribeToMore,
  } = useQuery(CONVERSATION_QUERY, {
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

  useEffect(() => {
    refetch();
  }, [conversationId, refetch]);

  return (
    user && (
      <Container>
        <div tw="flex w-full h-full">
          <Sidebar
            channels={channels}
            handleChannelClick={(id) => setConversationId(id)}
          />
          <div tw="flex flex-col flex-1">
            <Header>
              <p>
                {
                  channels.find(
                    (channel: Channel) =>
                      channel.conversation.id === conversationId,
                  ).name
                }
              </p>
            </Header>
            <div tw="flex flex-col flex-1 px-4 pb-4 overflow-hidden">
              <MessageList
                messages={messages}
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
      </Container>
    )
  );
}