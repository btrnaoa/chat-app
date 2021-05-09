import { gql, useQuery } from '@apollo/client';
import { UsersIcon } from '@heroicons/react/solid';
import 'twin.macro';
import { User } from '../common/types';
import List from '../components/Sidebar/List';
import ListItem from '../components/Sidebar/ListItem';

const GET_ONLINE_USERS = gql`
  query {
    usersOnline {
      id
      name
    }
  }
`;

export default function UserList({
  handleClick,
}: {
  handleClick: (id: User['id']) => void;
}) {
  const { data: { usersOnline = [] } = {} } = useQuery<{
    usersOnline: User[];
  }>(GET_ONLINE_USERS, { pollInterval: 500 });
  return (
    <List heading="Users" icon={<UsersIcon />}>
      {usersOnline.map(({ id, name }) => (
        <ListItem key={id} onClick={() => handleClick(id)} aria-hidden>
          {name}
        </ListItem>
      ))}
    </List>
  );
}
