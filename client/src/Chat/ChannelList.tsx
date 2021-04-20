import { gql, useQuery } from '@apollo/client';
import 'twin.macro';
import { Channel } from '../common/types';

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
      <h2 tw="px-4 py-2 text-xs font-semibold tracking-wider uppercase">
        Channels
      </h2>
      <ul>
        {channels.map(({ id, name, conversation }) => (
          <li
            key={id}
            onClick={() => handleChannelClick(conversation.id)}
            aria-hidden
          >
            <p tw="px-4 py-1 text-white cursor-pointer hover:bg-indigo-600">
              {name}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}
