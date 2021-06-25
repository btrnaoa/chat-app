import 'twin.macro';
import List from '../components/Sidebar/List';
import ListItem from '../components/Sidebar/ListItem';
import { useGetUsersOnlineQuery } from '../graphql/hooks.generated';
import type { User } from '../graphql/types.generated';

type UserListProps = {
  handleClick: (id: User['id']) => void;
};

export default function UserList({ handleClick }: UserListProps) {
  const { data: { usersOnline = [] } = {} } = useGetUsersOnlineQuery({
    pollInterval: 500,
  });
  return (
    <List heading="Users">
      {usersOnline.map(({ id, name }) => (
        <ListItem key={id} onClick={() => handleClick(id)} aria-hidden>
          {name}
        </ListItem>
      ))}
    </List>
  );
}
