import { Arg, Ctx, ID, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { EntityManager } from 'typeorm';
import { InjectManager } from 'typeorm-typedi-extensions';
import Conversation from '../../models/Conversation';
import type { Context } from '../context';

@Service()
@Resolver(() => Conversation)
export default class ConversationResolver {
  constructor(@InjectManager() private readonly manager: EntityManager) {}

  @Query(() => Conversation, { nullable: true })
  async conversation(@Arg('id', () => ID) id: string) {
    return this.manager.findOne(Conversation, id, {
      relations: ['users', 'messages', 'messages.user'],
    });
  }

  @Query(() => [Conversation])
  async conversations(@Ctx() ctx: Context) {
    return this.manager
      .createQueryBuilder(Conversation, 'conversation')
      .leftJoinAndSelect('conversation.messages', 'message')
      .leftJoinAndSelect('conversation.users', 'user')
      .innerJoin('conversation.users', 'u', 'u.id = :id', {
        id: ctx.userId,
      })
      .getMany();
  }

  @Query(() => Conversation, { nullable: true })
  async findConversationByUser(
    @Arg('id', () => ID) id: string,
    @Ctx() ctx: Context,
  ) {
    const ids = [id, ctx.userId].sort();
    return this.manager
      .createQueryBuilder(Conversation, 'conversation')
      .groupBy('conversation.id')
      .leftJoinAndSelect('conversation.messages', 'message')
      .addGroupBy('message.id')
      .leftJoinAndSelect('conversation.users', 'user')
      .addGroupBy('user.id')
      .leftJoin('conversation.users', 'u')
      .having(
        'ARRAY_AGG(DISTINCT u.id ORDER BY u.id) = ARRAY[:...ids]::uuid[]',
        { ids },
      )
      .getOne();
  }
}
