import { gql, useMutation } from '@apollo/client';
import { Conversation, Message, User } from '../common/types';

const CREATE_MESSAGE = gql`
  mutation($input: MessageInput!) {
    createMessage(input: $input)
  }
`;

export default function useCreateMessage() {
  const [createMessage] = useMutation(CREATE_MESSAGE);
  return (
    content: Message['content'],
    conversationId: Conversation['id'],
    userId: User['id'],
  ) =>
    createMessage({
      variables: { input: { content, conversationId, userId } },
    });
}
