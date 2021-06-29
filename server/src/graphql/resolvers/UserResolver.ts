import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { EntityManager } from 'typeorm';
import { InjectManager } from 'typeorm-typedi-extensions';
import config from '../../config';
import Conversation from '../../models/Conversation';
import User from '../../models/User';
import UserConversation from '../../models/UserConversation';

@Service()
@Resolver(() => User)
export default class UserResolver {
  constructor(@InjectManager() private readonly manager: EntityManager) {}

  @Query(() => [User])
  async usersOnline() {
    return this.manager.find(User, { where: { isOnline: true } });
  }

  @Mutation(() => UserConversation)
  async loginUser(
    @Arg('username') username: string,
    @Arg('conversationName', {
      nullable: true,
      defaultValue: config.defaultConversationName,
    })
    conversationName: string,
  ) {
    const user = await this.manager.save(
      this.manager.create(User, { name: username }),
    );
    let conversation = await this.manager
      .createQueryBuilder(Conversation, 'conversation')
      .where('LOWER(conversation.name) = LOWER(:conversationName)', {
        conversationName,
      })
      .getOne();
    if (!conversation) {
      conversation = await this.manager.save(
        this.manager.create(Conversation, { name: conversationName }),
      );
    }
    const userConversation = await this.manager.save(
      this.manager.create(UserConversation, { conversation, user }),
    );
    return userConversation;
  }
}
