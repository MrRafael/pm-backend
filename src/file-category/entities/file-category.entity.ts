import { ProjectFile } from 'src/project-files/entities/project-file.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FileCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => ProjectFile, (file) => file.project, {
    onDelete: 'NO ACTION',
  })
  files: ProjectFile[];
}
