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

  @Column()
  isPrivate: boolean;

  @ManyToOne(() => User, (user) => user.topics, {
    cascade: true,
  })
  user: User;

  @OneToMany(() => TopicItem, (topicItem) => topicItem.topic, {
    cascade: true,
    eager: true,
  })
  items: TopicItem[];
}
