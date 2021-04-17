import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Conversation from './Conversation';

@Entity()
export default class Channel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 21 })
  name: string;

  @OneToOne(() => Conversation)
  @JoinColumn()
  conversation: Conversation;
}
