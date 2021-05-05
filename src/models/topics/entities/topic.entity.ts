import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { TopicItem } from '../../topic-items/entities/topic-item.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Topic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.topics)
  user: User;

  @OneToMany(() => TopicItem, (topicItem) => topicItem.topic)
  items: TopicItem[];
}
