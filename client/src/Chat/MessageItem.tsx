import 'twin.macro';
import type { Message, User } from '../graphql/types.generated';

type MessageItemProps = {
  content: Message['content'];
  createdAt: Message['createdAt'];
  username: User['name'];
};

export default function MessageItem({
  content,
  createdAt,
  username,
}: MessageItemProps) {
  return (
    <li tw="flex flex-col px-4 py-2 text-gray-700 break-all">
      <div>
        <span tw="font-semibold">{username}</span>
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
