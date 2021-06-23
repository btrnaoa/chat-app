import { Field, ID, ObjectType } from 'type-graphql';
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
@ObjectType()
export default class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column('varchar', { length: 32 })
  name: string;

  @Field()
  @Column('bool', { default: false })
  isOnline: boolean;

  @Field(() => [UserConversation])
  @ManyToMany(() => Conversation, (conversation) => conversation.users)
  conversations: UserConversation[];

  @Field(() => [UserConversation])
  @OneToMany(
    () => UserConversation,
    (userConversation) => userConversation.user,
  )
  userConversations: UserConversation[];
}
