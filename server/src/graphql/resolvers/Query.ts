import { getManager } from 'typeorm';
import Conversation from '../../entities/Conversation';
import User from '../../entities/User';

type ConversationArgsProps = {
  userId: User['id'];
  conversationId?: Conversation['id'];
};

export default {
  conversation: async (
    _: any,
    { userId, conversationId }: ConversationArgsProps,
  ) => {
    const manager = getManager();
    const query = manager
      .createQueryBuilder(Conversation, 'conversation')
      .innerJoinAndSelect('conversation.users', 'user', 'user.id = :userId', {
        userId,
      });

    let conversation = await query.getOne();
    if (!conversation) {
      throw new Error('User does not belong in any conversations');
    }

    if (conversationId) {
      conversation = await query
        .where('conversation.id = :conversationId', {
          conversationId,
        })
        .getOne();
      if (!conversation) {
        throw new Error('User does not belong in specified conversation');
      }
    }

    return manager.findOne(Conversation, conversation.id, {
      relations: ['users', 'messages', 'messages.user'],
    });
  },
  conversations: (_: any, args: { userId: User['id'] }) =>
    getManager()
      .createQueryBuilder(Conversation, 'conversation')
      .innerJoinAndSelect('conversation.users', 'user')
      .innerJoin('conversation.userConversations', 'userConversation')
      .innerJoin('userConversation.user', 'u', 'u.id = :id', {
        id: args.userId,
      })
      .getMany(),
  usersOnline: () => getManager().find(User, { where: { isOnline: true } }),
};
