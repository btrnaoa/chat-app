import tw from 'twin.macro';
import ChatMessage from './ChatMessage';
import { Message } from '../common/types';

export default function ChatMessageList({ messages }: { messages: Message[] }) {
  return (
    <div css={tw`flex flex-col-reverse h-full mb-4 overflow-hidden hover:overflow-y-auto`}>
      <div>
        {messages.map(({ id, content, createdAt, user }) => (
          <ChatMessage key={id} content={content} createdAt={createdAt} user={user} />
        ))}
      </div>
    </div>
  );
}
