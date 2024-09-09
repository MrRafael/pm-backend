import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  employeeName: string;

  @Column()
  address: string;
}
