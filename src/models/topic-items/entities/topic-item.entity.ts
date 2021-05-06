import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Topic } from '../../topics/entities/topic.entity';
import { Locale } from '../../locales/entities/locale.entity';
import { Example } from '../../examples/entities/example.entity';

@Entity()
export class TopicItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Locale, (locale) => locale.nativeLocale, {
    eager: true,
  })
  nativeLocale: Locale;

  @Column({ length: 40 })
  nativeText: string;

  @ManyToOne(() => Locale, (locale) => locale.targetLocale, {
    eager: true,
  })
  targetLocale: Locale;

  @Column({ length: 40 })
  targetText: string;

  @ManyToOne(() => Topic, (topic) => topic.items)
  topic: Topic;

  @OneToMany(() => Example, (example) => example.topicItem, {
    cascade: true,
    eager: true,
  })
  examples: Example[];
}
