import { Arg, Ctx, ID, Mutation, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { EntityManager } from 'typeorm';
import { InjectManager } from 'typeorm-typedi-extensions';
import Conversation from '../../models/Conversation';
import User from '../../models/User';
import UserConversation from '../../models/UserConversation';
import type { Context } from '../context';

@Service()
@Resolver(() => Conversation)
export default class ConversationResolver {
  constructor(@InjectManager() private readonly manager: EntityManager) {}

  getConversationQuery(userId: Context['userId']) {
    return this.manager
      .createQueryBuilder(Conversation, 'conversation')
      .leftJoinAndSelect('conversation.createdBy', 'createdBy_user')
      .leftJoinAndSelect('conversation.messages', 'message')
      .leftJoinAndSelect('message.user', 'message_user')
      .leftJoinAndSelect('conversation.users', 'user')
      .innerJoin('conversation.users', 'u', 'u.id = :userId', { userId });
  }

  @Query(() => Conversation, { nullable: true })
  async conversation(@Arg('id', () => ID) id: string, @Ctx() ctx: Context) {
    return this.getConversationQuery(ctx.userId)
      .where('conversation.id = :id', { id })
      .getOne();
  }

  @Query(() => [Conversation])
  async conversations(@Ctx() { userId }: Context) {
    return this.getConversationQuery(userId)
      .where(
        'message IS NOT NULL OR createdBy_user.id = :userId OR conversation.isPrivate = :isPrivate',
        {
          userId,
          isPrivate: false,
        },
      )
      .getMany();
  }

  @Mutation(() => ID)
  async startConversation(@Arg('userId') userId: string, @Ctx() ctx: Context) {
    const userIds = [userId, ctx.userId].sort();
    let conversation = await this.manager
      .createQueryBuilder(Conversation, 'conversation')
      .groupBy('conversation.id')
      .innerJoin('conversation.users', 'user')
      .having(
        'ARRAY_AGG(DISTINCT user.id ORDER BY user.id) = ARRAY[:...userIds]::uuid[]',
        { userIds },
      )
      .where('conversation.isPrivate = :isPrivate', { isPrivate: true })
      .getOne();
    if (!conversation) {
      const createdBy = await this.manager.findOne(User, ctx.userId);
      conversation = await this.manager.save(
        this.manager.create(Conversation, {
          createdBy,
          isPrivate: true,
        }),
      );

      await this.manager.save(
        this.manager.create(UserConversation, {
          conversation,
          user: createdBy,
        }),
      );

      const user = await this.manager.findOne(User, userId);
      await this.manager.save(
        this.manager.create(UserConversation, { conversation, user }),
      );
    }
    return conversation.id;
  }
}
