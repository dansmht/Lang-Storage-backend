import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { TopicItem } from '../../topic-items/entities/topic-item.entity';

@Entity()
export class Example {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 300 })
  text: string;

  @ManyToOne(() => TopicItem, (topicItem) => topicItem.examples, {
    onDelete: 'CASCADE',
  })
  topicItem: TopicItem;
}
