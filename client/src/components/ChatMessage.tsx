import React from 'react';
import { ChatMessageProps } from '../common/types';

export default function ChatMessage({
  heading,
  time,
  message,
}: ChatMessageProps) {
  return (
    <div className="flex flex-col px-4 py-2 text-gray-700 break-all">
      <div>
        <span className="mr-4 font-bold">{heading}</span>
        <span className="text-xs text-gray-500">
          {time &&
            new Date(time).toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: 'numeric',
            })}
        </span>
      </div>
      {message}
    </div>
  );
}
