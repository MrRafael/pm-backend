import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FileCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
