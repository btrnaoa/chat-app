import { Field, ObjectType } from 'type-graphql';
import { Entity, ManyToOne } from 'typeorm';
import Conversation from './Conversation';
import User from './User';

@Entity()
@ObjectType()
export default class UserConversation {
  @Field(() => User)
  @ManyToOne(() => User, (user) => user.userConversations, { primary: true })
  user: User;

  @Field(() => Conversation)
  @ManyToOne(
    () => Conversation,
    (conversation) => conversation.userConversations,
    { primary: true },
  )
  conversation: Conversation;
}
