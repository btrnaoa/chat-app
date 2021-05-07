import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Conversation from './Conversation';
import User from './User';

@Entity()
export default class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @Column('timestamp with time zone', { default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  conversation: Conversation;
}
