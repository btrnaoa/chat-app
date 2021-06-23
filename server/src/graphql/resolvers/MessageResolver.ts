import {
  Arg,
  Ctx,
  ID,
  Mutation,
  Publisher,
  PubSub,
  Resolver,
  Root,
  Subscription,
} from 'type-graphql';
import { Service } from 'typedi';
import { EntityManager } from 'typeorm';
import { InjectManager } from 'typeorm-typedi-extensions';
import Conversation from '../../models/Conversation';
import Message from '../../models/Message';
import User from '../../models/User';
import { Context } from '../context';

@Service()
@Resolver(() => Message)
export default class MessageResolver {
  constructor(@InjectManager() private readonly manager: EntityManager) {}

  @Mutation(() => ID)
  async createMessage(
    @Arg('conversationId', () => ID) conversationId: string,
    @Arg('content') content: string,
    @Ctx() ctx: Context,
    @PubSub('MESSAGE_CREATED') publish: Publisher<{ newMessage: Message }>,
  ) {
    const user = await this.manager.findOne(User, ctx.userId);
    const conversation = await this.manager.findOne(
      Conversation,
      conversationId,
    );

    const message = await this.manager.save(
      this.manager.create(Message, {
        content,
        user,
        conversation,
      }),
    );

    // Publish new message to subscribers
    await publish({ newMessage: message });

    return message.id;
  }

  @Subscription(() => Message, {
    topics: 'MESSAGE_CREATED',
    filter: ({ payload, args }) =>
      payload.newMessage.conversation.id === args.conversationId,
  })
  newMessage(
    @Root() { newMessage }: { newMessage: Message },
    @Arg('conversationId', () => ID) _conversationId: string,
  ) {
    return newMessage;
  }
}
