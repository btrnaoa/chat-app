import { PaperAirplaneIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import 'twin.macro';
import { useCreateMessageMutation } from '../graphql/hooks.generated';
import type { Conversation } from '../graphql/types.generated';

type MessageInputProps = {
  conversationId: Conversation['id'] | null;
};

export default function MessageInput({ conversationId }: MessageInputProps) {
  const [messageContent, setMessageContent] = useState('');
  const [createMessage] = useCreateMessageMutation();
  return (
    <form
      tw="flex"
      autoComplete="off"
      onSubmit={(event) => {
        event.preventDefault();
        if (conversationId) {
          createMessage({
            variables: { conversationId, content: messageContent },
          });
        }
        setMessageContent('');
      }}
    >
      <input
        tw="flex-1 px-4 py-2 text-sm text-gray-900 placeholder-indigo-600 border rounded-lg border-indigo-50"
        type="text"
        placeholder="Message"
        value={messageContent}
        onChange={(event) => setMessageContent(event.target.value)}
        required
      />
      <button tw="pl-4" type="submit">
        <PaperAirplaneIcon tw="w-5 h-5 text-indigo-600 transform rotate-90" />
      </button>
    </form>
  );
}
