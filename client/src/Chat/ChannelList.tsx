import { gql, useQuery } from '@apollo/client';
import 'twin.macro';
import { Channel } from '../common/types';
import Heading from '../components/Sidebar/Heading';
import ListItem from '../components/Sidebar/ListItem';

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

export default function ChannelList({
  handleChannelClick,
}: {
  handleChannelClick: (conversationId: string) => void;
}) {
  const { data: { channels = [] } = {} } = useQuery<{ channels: Channel[] }>(
    CHANNEL_QUERY,
  );
  return (
    <>
      <Heading>Channels</Heading>
      <ul>
        {channels.map(({ id, name, conversation }) => (
          <ListItem
            key={id}
            onClick={() => handleChannelClick(conversation.id)}
            aria-hidden
          >
            {name}
          </ListItem>
        ))}
      </ul>
    </>
  );
}
