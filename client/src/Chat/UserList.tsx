import { gql, useQuery } from '@apollo/client';
import { User } from '../common/types';
import Heading from '../components/Sidebar/Heading';
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
    <>
      <Heading>Online Users</Heading>
      <ul>
        {usersOnline.map(({ id, name }) => (
          <ListItem key={id} onClick={() => handleClick(id)} aria-hidden>
            {name}
          </ListItem>
        ))}
      </ul>
    </>
  );
}
