import React from 'react';
import tw from 'twin.macro';
import { ChatMessageProps } from '../common/types';

export default function ChatMessage({
  heading,
  time,
  message,
}: ChatMessageProps) {
  return (
    <div css={tw`flex flex-col px-4 py-2 text-gray-700 break-all`}>
      <div>
        <span css={tw`font-bold`}>{heading}</span>
        <span css={tw`ml-4 text-xs text-gray-500`}>
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
