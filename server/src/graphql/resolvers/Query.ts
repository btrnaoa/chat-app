import { getRepository } from 'typeorm';
import Channel from '../../entities/Channel';
import Conversation from '../../entities/Conversation';

export default {
  channels: () => getRepository(Channel).find({ relations: ['conversation'] }),
  channel: (_: any, args: any) =>
    getRepository(Channel).findOne({
      relations: ['conversation'],
      where: { conversation: { id: args.conversationId } },
    }),
  conversation: (_: any, args: any) =>
    getRepository(Conversation).findOne(args.conversationId, {
      relations: [
        'users',
        'messages',
        'messages.user',
        'messages.conversation',
      ],
    }),
};
