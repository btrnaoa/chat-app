import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Conversation from './Conversation';
import Message from './Message';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 32 })
  name: string;

  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];

  @ManyToMany(() => Conversation, (conversation) => conversation.users)
  conversations: Conversation[];
}
