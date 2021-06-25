import 'twin.macro';
import List from '../components/Sidebar/List';
import ListItem from '../components/Sidebar/ListItem';
import { useGetConversationsQuery } from '../graphql/hooks.generated';
import type { Conversation, User } from '../graphql/types.generated';

type ConversationListProps = {
  currentUserId: User['id'];
  handleClick: (id: Conversation['id']) => void;
};

export default function ConversationList({
  currentUserId,
  handleClick,
}: ConversationListProps) {
  const { data: { conversations = [] } = {} } = useGetConversationsQuery({
    pollInterval: 500,
  });

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
