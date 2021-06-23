import { gql, useQuery } from '@apollo/client';
import 'twin.macro';
import type { Conversation, User } from '../common/types';
import List from '../components/Sidebar/List';
import ListItem from '../components/Sidebar/ListItem';

const GET_CONVERSATIONS = gql`
  query GetConversations {
    conversations {
      id
      name
      users {
        id
        name
      }
    }
  }
`;

type ConversationListProps = {
  currentUserId: User['id'];
  handleClick: (id: Conversation['id']) => void;
};

export default function ConversationList({
  currentUserId,
  handleClick,
}: ConversationListProps) {
  const { data: { conversations = [] } = {} } = useQuery<{
    conversations: Conversation[];
  }>(GET_CONVERSATIONS, { pollInterval: 500 });

  const conversationsSortedByName = [...conversations].sort(
    (a, b) => Number(!a.name) - Number(!b.name),
  );

  return (
    <List heading="Conversations">
      {conversationsSortedByName.map(({ id, name, users }) => (
        <ListItem key={id} onClick={() => handleClick(id)} aria-hidden>
          {name ||
            users
              .filter((user) => user.id !== currentUserId)
              .map((user) => user.name)
              .join(', ')}
        </ListItem>
      ))}
    </List>
  );
}
