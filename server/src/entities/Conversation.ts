import { Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Message from './Message';
import User from './User';

@Entity()
export default class Conversation {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Message, (message) => message.conversation)
  messages: Message[];

  @ManyToMany(() => User, (user) => user.conversations, { cascade: true })
  @JoinTable()
  users: User[];
}
