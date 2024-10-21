import { Project } from 'src/project/entities/project.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CustomField {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  value: string;

  @ManyToOne(() => Project, (project) => project.customFields, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  project: Project;
}
