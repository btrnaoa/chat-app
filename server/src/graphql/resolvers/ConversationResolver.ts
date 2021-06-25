import { Arg, Ctx, ID, Mutation, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { EntityManager } from 'typeorm';
import { InjectManager } from 'typeorm-typedi-extensions';
import config from '../../config';
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
      .innerJoinAndSelect('conversation.users', 'user', 'user.id = :id', {
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

  @Mutation(() => ID)
  async createConversation(
    @Arg('name', {
      nullable: true,
      defaultValue: config.defaultConversationName,
    })
    name: string,
  ) {
    let conversation = await this.manager.findOne(Conversation, {
      where: { name },
    });
    if (!conversation) {
      conversation = await this.manager.save(
        this.manager.create(Conversation, { name }),
      );
    }
    return conversation.id;
  }
}
