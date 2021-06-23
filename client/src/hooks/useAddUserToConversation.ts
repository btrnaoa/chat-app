import { gql, useMutation } from '@apollo/client';
import type { Conversation, User } from '../common/types';

const ADD_USER_TO_CONVERSATION = gql`
  mutation AddUserToConversation($conversationId: ID!, $userId: ID!) {
    conversationId: addUserToConversation(
      conversationId: $conversationId
      userId: $userId
    )
  }
`;

export default function useAddUserToConversation() {
  const [addUserToConversation] = useMutation<{
    conversationId: Conversation['id'];
  }>(ADD_USER_TO_CONVERSATION);
  return (conversationId: Conversation['id'], userId: User['id']) =>
    addUserToConversation({ variables: { conversationId, userId } });
}
