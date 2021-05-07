import { useEffect } from 'react';
import 'twin.macro';
import { Message } from '../common/types';
import MessageItem from './MessageItem';

type MessageListProps = {
  messages: Message[];
  subscribeToNewMessages: () => () => void;
};

export default function MessageList({
  messages,
  subscribeToNewMessages,
}: MessageListProps) {
  useEffect(() => {
    const unsubscribe = subscribeToNewMessages();
    return () => unsubscribe();
  }, [subscribeToNewMessages]);
  return (
    <div tw="flex flex-col-reverse h-full mb-4 overflow-hidden hover:overflow-y-auto">
      <ul>
        {messages.map(({ id, content, createdAt, user }) => (
          <MessageItem
            key={id}
            content={content}
            createdAt={createdAt}
            user={user}
          />
        ))}
      </ul>
    </div>
  );
}
