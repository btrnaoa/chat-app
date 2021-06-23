import 'twin.macro';
import type { Message } from '../common/types';

export default function MessageItem({
  content,
  createdAt,
  user,
}: Pick<Message, 'content' | 'createdAt' | 'user'>) {
  return (
    <li tw="flex flex-col px-4 py-2 text-gray-700 break-all">
      <div>
        <span tw="font-semibold">{user.name}</span>
        <span tw="ml-4 text-xs text-gray-500">
          {new Date(createdAt).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
          })}
        </span>
      </div>
      <p>{content}</p>
    </li>
  );
}
