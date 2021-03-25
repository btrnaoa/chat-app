import React from 'react';
import tw from 'twin.macro';
import { Message } from '../common/types';

export default function ChatMessage({
  timestamp,
  user,
  content,
}: Partial<Message>) {
  return (
    <div css={tw`flex flex-col px-4 py-2 text-gray-700 break-all`}>
      <div>
        <span css={tw`font-bold`}>{user || content}</span>
        <span css={tw`ml-4 text-xs text-gray-500`}>
          {new Date(Number(timestamp)).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
          })}
        </span>
      </div>
      {user && content}
    </div>
  );
}
