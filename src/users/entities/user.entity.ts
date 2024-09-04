import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Role } from '../../enums/role.enum';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  @Exclude()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isComplete: boolean;

  @Column({ nullable: true })
  @Exclude()
  accessCode: string;

  @Column({ nullable: true })
  @Exclude()
  changePassLimit: Date;

  @Column('varchar', { default: ['worker'], array: true })
  roles: Role[];
}
