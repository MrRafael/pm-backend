import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProposalTemplate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fileName: string;

  @Column()
  originalName: string;

  @Column()
  mimetype: string;

  @Column()
  path: string;
}
