import { getRepository } from 'typeorm';
import Conversation from '../../entities/Conversation';
import Message from '../../entities/Message';
import User from '../../entities/User';

export default {
  createConversation: async (_: any, args: any) => {
    const repository = getRepository(Conversation);
    const user = await getRepository(User).findOne(args.userId);
    let conversation = repository.create({ users: [{ ...user }] });
    conversation = await repository.save(conversation);
    return conversation.id;
  },
  createMessage: async (_: any, args: any, context: any) => {
    const repository = getRepository(Message);
    const conversation = await getRepository(Conversation).findOne(
      args.conversationId,
    );
    const user = await getRepository(User).findOne(args.userId);
    let message = repository.create({
      content: args.content,
      user,
      conversation,
    });
    message = await repository.save(message);

    // Publish new message to subscribers
    context.pubsub.publish('MESSAGE_CREATED', {
      newMessage: message,
    });

    return message.id;
  },
  createUser: (_: any, args: { name: string }) => {
    const repository = getRepository(User);
    const user = repository.create({ name: args.name });
    return repository.save(user);
  },
};
