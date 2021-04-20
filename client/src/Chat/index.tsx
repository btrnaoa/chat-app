import { gql, useQuery } from '@apollo/client';
import { useState } from 'react';
import 'twin.macro';
import { Channel } from '../common/types';
import Container from '../components/Container';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { useUser } from '../context/user-context';
import ChannelList from './ChannelList';
import MessageInput from './MessageInput';
import MessageList from './MessageList';

const CHANNEL_QUERY = gql`
  query($conversationId: ID!) {
    channel(conversationId: $conversationId) {
      name
    }
  }
`;

export default function Chat() {
  const [conversationId, setConversationId] = useState('1');
  const { user } = useUser();

  const { data: { channel = null } = {} } = useQuery<{
    channel: Channel | null;
  }>(CHANNEL_QUERY, { variables: { conversationId } });

  if (!user) return null;
  return (
    <Container>
      <div tw="flex w-full h-full">
        <Sidebar>
          <ChannelList handleChannelClick={(id) => setConversationId(id)} />
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
