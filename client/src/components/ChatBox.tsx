import React from 'react';
import ChatMessage from './ChatMessage';
import { ChatMessageProps } from '../common/types';

export default function ChatBox({ entries }: { entries: ChatMessageProps[] }) {
  return (
    <div className="flex flex-col-reverse h-full mb-4 overflow-hidden hover:overflow-y-auto">
      <div>
        {entries.map((item) => {
          const { user, time, message } = item;
          return (
            <ChatMessage key={time} user={user} time={time} message={message} />
          );
        })}
      </div>
    </div>
  );
}
