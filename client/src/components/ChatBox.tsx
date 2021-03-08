import React from 'react';
import tw from 'twin.macro';
import ChatMessage from './ChatMessage';
import { ChatMessageProps } from '../common/types';

export default function ChatBox({ entries }: { entries: ChatMessageProps[] }) {
  return (
    <div
      css={tw`flex flex-col-reverse h-full mb-4 overflow-hidden hover:overflow-y-auto`}
    >
      <div>
        {entries.map((item) => {
          const { heading, time, message } = item;
          return (
            <ChatMessage
              key={time || Date.now()}
              heading={heading}
              time={time}
              message={message}
            />
          );
        })}
      </div>
    </div>
  );
}
