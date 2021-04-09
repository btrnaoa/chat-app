import { getRepository } from 'typeorm';
import Conversation from '../../entities/Conversation';

export default {
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
