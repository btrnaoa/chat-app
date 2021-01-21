import React from 'react';

export type ChatMessageProps = {
  user: string;
  message: string;
  time: number;
};

export default function ChatMessage({ user, message, time }: ChatMessageProps) {
  const timeStr = new Date(time).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  });
  return (
    <div className="flex flex-col py-2 px-4 text-gray-700 break-words">
      <div>
        <span className="font-bold mr-4">{user}</span>
        <span className="text-gray-500 text-xs">{timeStr}</span>
      </div>
      {message}
    </div>
  );
}
