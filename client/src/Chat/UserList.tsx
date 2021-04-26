import { gql, useQuery } from '@apollo/client';
import { User } from '../common/types';
import Heading from '../components/Sidebar/Heading';
import ListItem from '../components/Sidebar/ListItem';

const GET_ONLINE_USERS = gql`
  query {
    onlineUsers {
      id
      name
    }
  }
`;

export default function UserList() {
  const { data: { onlineUsers = [] } = {} } = useQuery<{ onlineUsers: User[] }>(
    GET_ONLINE_USERS,
    { pollInterval: 500 },
  );
  return (
    <>
      <Heading>Users</Heading>
      <ul>
        {onlineUsers.map(({ id, name }) => (
          <ListItem key={id}>{name}</ListItem>
        ))}
      </ul>
    </>
  );
}
