import { gql, useMutation } from '@apollo/client';
import { Conversation, User } from '../common/types';

const CREATE_CONVERSATION = gql`
  mutation($userIds: [ID!]!) {
    conversationId: createConversation(userIds: $userIds)
  }
`;

export default function useCreateConversation() {
  const [createConversation] = useMutation<{
    conversationId: Conversation['id'];
  }>(CREATE_CONVERSATION);
  return (userIds: Array<User['id']>) =>
    createConversation({ variables: { userIds } });
}
