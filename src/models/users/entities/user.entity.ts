import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Topic } from '../../topics/entities/topic.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  googleId: string;

  @Column()
  displayName: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  picture?: string;

  @OneToMany(() => Topic, (topic) => topic.items)
  topics: Topic[];
}
