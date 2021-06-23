import { Arg, ID, Mutation } from 'type-graphql';
import { Service } from 'typedi';
import { EntityManager } from 'typeorm';
import { InjectManager } from 'typeorm-typedi-extensions';
import Conversation from '../../models/Conversation';
import User from '../../models/User';
import UserConversation from '../../models/UserConversation';

@Service()
export default class UserConversationResolver {
  constructor(@InjectManager() private readonly manager: EntityManager) {}

  @Mutation(() => ID)
  async addUserToConversation(
    @Arg('conversationId', () => ID) conversationId: string,
    @Arg('userId', () => ID) userId: string,
  ) {
    const conversation = await this.manager
      .createQueryBuilder(Conversation, 'conversation')
      .leftJoinAndSelect('conversation.users', 'user')
      .where('conversation.id = :id', { id: conversationId })
      .getOne();

    if (!conversation) {
      throw new Error('Conversation not found');
    }

    const user = await this.manager.findOne(User, userId);
    if (!user) {
      throw new Error('User not found');
    }

    await this.manager.save(
      this.manager.create(UserConversation, { conversation, user }),
    );
    return conversation.id;
  }
}
