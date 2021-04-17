import 'twin.macro';
import { Message } from '../common/types';

export default function ChatMessage({
  content,
  createdAt,
  user,
}: Omit<Message, 'id'>) {
  return (
    <div tw="flex flex-col px-4 py-2 text-gray-700 break-all">
      <div>
        <span tw="font-bold">{user.name || content}</span>
        <span tw="ml-4 text-xs text-gray-500">
          {new Date(Number(createdAt)).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
          })}
        </span>
      </div>
      {user.name && content}
    </div>
  );
}
