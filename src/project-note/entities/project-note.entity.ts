import { Project } from 'src/project/entities/project.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CreateProjectNoteDto } from '../dto/create-project-note.dto';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class ProjectNote {
  constructor(createProjectNoteDto?: CreateProjectNoteDto) {
    if (createProjectNoteDto) {
      this.note = createProjectNoteDto.note;
      this.createdAt = new Date();
      const project = new Project();
      project.id = createProjectNoteDto.projectId;
      this.project = project;
    }
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  note: string;

  @Column()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.notes, {
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Project, (project) => project.files, {
    onDelete: 'CASCADE',
  })
  project: Project;
}
