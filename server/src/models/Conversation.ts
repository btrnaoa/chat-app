import { Field, ID, ObjectType } from 'type-graphql';
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
@ObjectType()
export default class Conversation {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field({ nullable: true })
  @Column('varchar', { length: 21, nullable: true, unique: true })
  name?: string;

  @Field(() => [Message])
  @OneToMany(() => Message, (message) => message.conversation)
  messages: Message[];

  @Field(() => [UserConversation])
  @OneToMany(
    () => UserConversation,
    (userConversation) => userConversation.conversation,
  )
  userConversations: UserConversation[];

  @Field(() => [User])
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
