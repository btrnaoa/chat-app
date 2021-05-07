import { PubSub } from 'apollo-server-express';
import { getManager } from 'typeorm';
import Conversation from '../../entities/Conversation';
import Message from '../../entities/Message';
import User from '../../entities/User';
import UserConversation from '../../entities/UserConversation';

type CreateMessageArgsProps = {
  input: {
    content: Message['content'];
    userId: User['id'];
    conversationId: Conversation['id'];
  };
};

type CreateUserArgsProps = {
  name: User['name'];
  conversationName: Conversation['name'];
};

export default {
  createConversation: async (_: any, args: { userIds: Array<User['id']> }) => {
    const manager = getManager();

    const existingConversation = await manager
      .createQueryBuilder(Conversation, 'conversation')
      .where('conversation.isPrivate = :isPrivate', { isPrivate: true })
      .groupBy('conversation.id')
      .innerJoin('conversation.users', 'user')
      .having('ARRAY_AGG(user.id ORDER BY user.id) = ARRAY[:...ids]::uuid[]', {
        ids: args.userIds.sort(),
      })
      .getOne();

    if (!existingConversation) {
      const users = await manager.findByIds(User, args.userIds);
      const conversation = await manager.save(
        manager.create(Conversation, { isPrivate: true }),
      );
      users.forEach((user) => {
        manager.save(
          manager.create(UserConversation, {
            conversation,
            user,
          }),
        );
      });
      return conversation.id;
    }

    return existingConversation.id;
  },
  createMessage: async (
    _: any,
    args: CreateMessageArgsProps,
    context: { pubsub: PubSub },
  ) => {
    const { content, conversationId, userId } = args.input;
    const manager = getManager();
    const user = await manager.findOne(User, userId);
    const conversation = await manager.findOne(Conversation, conversationId);

    const message = await manager.save(
      manager.create(Message, {
        content,
        user,
        conversation,
      }),
    );

    // Publish new message to subscribers
    context.pubsub.publish('MESSAGE_CREATED', {
      newMessage: message,
    });

    return message.id;
  },
  createUser: async (_: any, args: CreateUserArgsProps) => {
    const manager = getManager();
    const user = await manager.save(manager.create(User, { name: args.name }));

    const conversationName = args.conversationName || 'General';

    let conversation = await manager
      .createQueryBuilder(Conversation, 'conversation')
      .where('LOWER(conversation.name) = LOWER(:name)', {
        name: conversationName,
      })
      .getOne();

    if (!conversation) {
      conversation = await manager.save(
        manager.create(Conversation, {
          name: conversationName,
        }),
      );
    }

    manager.save(manager.create(UserConversation, { conversation, user }));

    return user.id;
  },
};
