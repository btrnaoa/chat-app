import { gql, useMutation } from '@apollo/client';
import type { Conversation, Message } from '../common/types';

const CREATE_MESSAGE = gql`
  mutation CreateMessage($content: String!, $conversationId: ID!) {
    createMessage(content: $content, conversationId: $conversationId)
  }
`;

export default function useCreateMessage() {
  const [createMessage] = useMutation(CREATE_MESSAGE);
  return (conversationId: Conversation['id'], content: Message['content']) =>
    createMessage({
      variables: { content, conversationId },
    });
}
