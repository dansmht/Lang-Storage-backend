import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Topic } from '../../topics/entities/topic.entity';
import { Locale } from '../../locales/entities/locale.entity';
import { Example } from '../../examples/entities/example.entity';

@Entity()
export class TopicItem {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Locale)
  @JoinColumn()
  nativeLocale: Locale;

  @Column({ length: 40 })
  nativeText: string;

  @OneToOne(() => Locale)
  @JoinColumn()
  targetLocale: Locale;

  @Column({ length: 40 })
  targetText: string;

  @ManyToOne(() => Topic, (topic) => topic.items)
  topic: Topic;

  @OneToMany(() => Example, (example) => example.topicItem)
  examples: Example[];
}
