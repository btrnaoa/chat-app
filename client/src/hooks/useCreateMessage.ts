import { gql, useMutation } from '@apollo/client';

const CREATE_MESSAGE = gql`
  mutation($conversationId: ID!, $userId: ID!, $content: String!) {
    createMessage(
      conversationId: $conversationId
      userId: $userId
      content: $content
    )
  }
`;

export default function useCreateMessage() {
  const [createMessage] = useMutation(CREATE_MESSAGE);
  return (conversationId: string, userId: string, content: string) =>
    createMessage({ variables: { conversationId, userId, content } });
}
