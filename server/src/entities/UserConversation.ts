import { Entity, ManyToOne } from 'typeorm';
import Conversation from './Conversation';
import User from './User';

@Entity()
export default class UserConversation {
  @ManyToOne(() => User, (user) => user.userConversations, { primary: true })
  user: User;

  @ManyToOne(
    () => Conversation,
    (conversation) => conversation.userConversations,
    { primary: true },
  )
  conversation: Conversation;
}
