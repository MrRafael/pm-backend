import { FileCategory } from 'src/file-category/entities/file-category.entity';
import { Project } from 'src/project/entities/project.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProjectFile {
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

  @ManyToOne(() => Project, (project) => project.files, {
    onDelete: 'CASCADE',
  })
  project: Project;

  @ManyToOne(() => FileCategory, (fileCategory) => fileCategory.files, {
    onDelete: 'NO ACTION',
  })
  fileCategory: FileCategory;
}
