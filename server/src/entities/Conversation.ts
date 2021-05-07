import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Message from './Message';
import User from './User';
import UserConversation from './UserConversation';

@Entity()
export default class Conversation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 21, nullable: true })
  name?: string;

  @Column('bool', { default: false })
  isPrivate: boolean;

  @OneToMany(() => Message, (message) => message.conversation)
  messages: Message[];

  @OneToMany(
    () => UserConversation,
    (userConversation) => userConversation.conversation,
  )
  userConversations: UserConversation[];

  @ManyToMany(() => User, (user) => user.conversations)
  @JoinTable({
    name: 'user_conversation',
    joinColumn: {
      name: 'conversationId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'userId',
      referencedColumnName: 'id',
    },
  })
  users: User[];
}
