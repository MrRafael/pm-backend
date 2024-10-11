import { Client } from 'src/clients/entities/client.entity';
import { PaymentInstallment } from 'src/payment-installments/entities/payment-installment.entity';
import { ProjectFile } from 'src/project-files/entities/project-file.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { CreateProjectDto } from '../dto/create-project.dto';
import { ProjectNote } from 'src/project-note/entities/project-note.entity';

@Entity()
export class Project {
  constructor(createProjectDto?: CreateProjectDto) {
    if (createProjectDto) {
      const clientToSave = new Client();
      clientToSave.id = createProjectDto.clientId;
      this.client = clientToSave;
      this.value = createProjectDto.value;
      this.title = createProjectDto.title;
      this.considerations = createProjectDto.considerations;
      this.product = createProjectDto.product;
      this.deliveryTime = createProjectDto.deliveryTime;
      this.paymentMethod = createProjectDto.paymentMethod;
      this.paymentInstallments = createProjectDto.paymentInstallments;

      const now = new Date();
      this.id = `${now.getFullYear()}${now.getMonth() + 1}${now.getDate()}-${now.getHours()}${now.getMinutes()}${now.getSeconds()}`;
      this.createdAt = now;
    }
  }
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Client, (client) => client.projects, {
    onDelete: 'NO ACTION',
  })
  client: Client;

  @Column({ nullable: true })
  value: number;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  considerations: string;

  @Column({ nullable: true })
  object: string;

  @Column({ nullable: true })
  product: string;

  @Column({ nullable: true })
  deliveryTime: string;

  @Column({ nullable: true })
  paymentMethod: string;

  @Column({ nullable: true })
  approvalDate: Date;

  @Column({ default: 'waitingApproval' })
  status: 'waitingApproval' | 'approved' | 'inProgress' | 'finished' | 'paid';

  @Column()
  createdAt: Date;

  @OneToMany(
    () => PaymentInstallment,
    (paymentInstallment) => paymentInstallment.project,
    {
      onDelete: 'NO ACTION',
      cascade: ['insert'],
    },
  )
  paymentInstallments: PaymentInstallment[];

  @OneToMany(() => ProjectFile, (file) => file.project, {
    onDelete: 'NO ACTION',
  })
  files: ProjectFile[];

  @OneToMany(() => ProjectNote, (note) => note.project, {
    onDelete: 'NO ACTION',
  })
  notes: ProjectNote[];
}
