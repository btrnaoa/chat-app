import { useState } from 'react';
import 'twin.macro';
import { Conversation, User } from '../common/types';
import useCreateMessage from '../hooks/useCreateMessage';

type MessageInputProps = {
  conversationId: Conversation['id'] | null;
  userId: User['id'];
};

export default function MessageInput({
  conversationId,
  userId,
}: MessageInputProps) {
  const [messageContent, setMessageContent] = useState('');
  const createMessage = useCreateMessage();
  return (
    <form
      tw="flex text-gray-700 border rounded-full"
      autoComplete="off"
      onSubmit={(event) => {
        event.preventDefault();
        if (conversationId) {
          createMessage(messageContent, conversationId, userId);
        }
        setMessageContent('');
      }}
    >
      <input
        tw="flex-1 px-4 py-2 rounded-full"
        type="text"
        placeholder="Message"
        value={messageContent}
        onChange={(event) => setMessageContent(event.target.value)}
        required
      />
      <button tw="px-4 text-sm font-semibold" type="submit">
        Send
      </button>
    </form>
  );
}
