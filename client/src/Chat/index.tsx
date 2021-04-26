import { gql, useQuery } from '@apollo/client';
import { useState } from 'react';
import 'twin.macro';
import { Channel, User } from '../common/types';
import Container from '../components/Container';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ChannelList from './ChannelList';
import MessageInput from './MessageInput';
import MessageList from './MessageList';
import UserList from './UserList';

const CHANNEL_QUERY = gql`
  query($conversationId: ID!) {
    channel(conversationId: $conversationId) {
      name
    }
  }
`;

export default function Chat({ user }: { user: User }) {
  const [conversationId, setConversationId] = useState('1');

  const { data: { channel = null } = {} } = useQuery<{
    channel: Channel | null;
  }>(CHANNEL_QUERY, { variables: { conversationId } });

  return (
    <Container>
      <div tw="flex w-full h-full">
        <Sidebar>
          <ChannelList handleChannelClick={(id) => setConversationId(id)} />
          <UserList />
        </Sidebar>
        <div tw="flex flex-col flex-1">
          <Header>{channel && <h1>{channel.name}</h1>}</Header>
          <div tw="flex flex-col flex-1 px-4 pb-4 overflow-hidden">
            <MessageList conversationId={conversationId} />
            <MessageInput conversationId={conversationId} userId={user.id} />
          </div>
        </div>
      </div>
    </Container>
  );
}
