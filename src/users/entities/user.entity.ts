import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';
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
  accessCode: string;

  @Column({ nullable: true })
  changePassLimit: Date;

  @Column('varchar', { default: ['worker'], array: true })
  roles: Role[];

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
