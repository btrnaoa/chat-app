import React from 'react';
import { ChatMessageProps } from '../common/types';

export default function ChatMessage({ user, time, message }: ChatMessageProps) {
  const timeStr = new Date(time).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  });
  return (
    <div className="flex flex-col px-4 py-2 text-gray-700 break-words">
      <div>
        <span className="mr-4 font-bold">{user}</span>
        <span className="text-xs text-gray-500">{timeStr}</span>
      </div>
      {message}
    </div>
  );
}
