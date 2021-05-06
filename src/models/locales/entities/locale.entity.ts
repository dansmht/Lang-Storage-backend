import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { TopicItem } from '../../topic-items/entities/topic-item.entity';

@Entity()
export class Locale {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 5 })
  name: string;

  @OneToMany(() => TopicItem, (topicItem) => topicItem.nativeLocale)
  nativeLocale: TopicItem;

  @OneToMany(() => TopicItem, (topicItem) => topicItem.targetLocale)
  targetLocale: TopicItem;
}
