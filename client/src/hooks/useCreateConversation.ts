import { gql, useMutation } from '@apollo/client';
import type { Conversation } from '../common/types';

const CREATE_CONVERSATION = gql`
  mutation CreateConversation($name: String) {
    conversationId: createConversation(name: $name)
  }
`;

export default function useCreateConversation() {
  const [createConversation] = useMutation<{
    conversationId: Conversation['id'];
  }>(CREATE_CONVERSATION);
  return (name?: Conversation['name']) =>
    createConversation({ variables: { name: name || undefined } });
}
