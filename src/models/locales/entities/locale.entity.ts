import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Locale {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
