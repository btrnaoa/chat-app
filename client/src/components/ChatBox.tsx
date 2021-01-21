import React from 'react';
import ChatMessage, { ChatMessageProps } from './ChatMessage';

export default function ChatBox({ entries }: { entries: ChatMessageProps[] }) {
  return (
    <div className="flex flex-col-reverse h-full mb-4 overflow-hidden hover:overflow-y-auto">
      <div>
        {entries.map((item) => {
          const { user, message, time } = item;
          return (
            <ChatMessage key={time} user={user} message={message} time={time} />
          );
        })}
      </div>
    </div>
  );
}
