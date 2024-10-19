import { ProjectNote } from 'src/project-note/entities/project-note.entity';
import { Project } from 'src/project/entities/project.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  cnpj: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @OneToMany(() => Project, (project) => project.client, {
    onDelete: 'NO ACTION',
  })
  projects: Project[];
}
