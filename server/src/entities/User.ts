import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Conversation from './Conversation';
import UserConversation from './UserConversation';

@Entity()
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 32 })
  name: string;

  @Column('bool', { default: false })
  isOnline: boolean;

  @ManyToMany(() => Conversation, (conversation) => conversation.users)
  conversations: UserConversation[];

  @OneToMany(
    () => UserConversation,
    (userConversation) => userConversation.user,
  )
  userConversations: UserConversation[];
}
