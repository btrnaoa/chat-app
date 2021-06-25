import { useEffect } from 'react';
import 'twin.macro';
import MessageItem from './MessageItem';
import type { GetConversationQuery } from '../graphql/types.generated';

type MessageListProps = {
  messages: NonNullable<GetConversationQuery['conversation']>['messages'];
  subscribeToNewMessages: (() => () => void) | null;
};

export default function MessageList({
  messages,
  subscribeToNewMessages,
}: MessageListProps) {
  useEffect(() => {
    if (!subscribeToNewMessages) {
      return undefined;
    }
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
            username={user.name}
          />
        ))}
      </ul>
    </div>
  );
}
