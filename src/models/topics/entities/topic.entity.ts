import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
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

  @Column()
  position: string;

  @Column({ default: false })
  isCopied: boolean;

  @Column({ default: 0 })
  copiedTimes: number;

  @Column({ nullable: true })
  originalTopicId: number;

  @ManyToOne(() => User, (user) => user.topics, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  user: User;

  @OneToMany(() => TopicItem, (topicItem) => topicItem.topic, {
    cascade: true,
    eager: true,
  })
  items: TopicItem[];

  @ManyToMany(() => User, {
    eager: true,
  })
  @JoinTable()
  copied: User[];

  @Column({ type: 'timestamptz' })
  updatedDate: Date;
}
