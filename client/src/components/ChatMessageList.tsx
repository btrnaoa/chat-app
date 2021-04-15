import { useEffect } from 'react';
import tw from 'twin.macro';
import { Message } from '../common/types';
import ChatMessage from './ChatMessage';

type ChatMessageListProps = {
  messages: Message[];
  subscribeToNewMessages: () => void;
};

export default function ChatMessageList({
  messages,
  subscribeToNewMessages,
}: ChatMessageListProps) {
  useEffect(() => {
    subscribeToNewMessages();
  }, [subscribeToNewMessages]);
  return (
    <div
      css={tw`flex flex-col-reverse h-full mb-4 overflow-hidden hover:overflow-y-auto`}
    >
      <div>
        {messages.map(({ id, content, createdAt, user }) => (
          <ChatMessage
            key={id}
            content={content}
            createdAt={createdAt}
            user={user}
          />
        ))}
      </div>
    </div>
  );
}
