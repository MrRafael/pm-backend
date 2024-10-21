import { Project } from 'src/project/entities/project.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UpdatePaymentInstallmentDto } from '../dto/update-payment-installment.dto';

@Entity()
export class PaymentInstallment {
  constructor(
    updatePaymentInstallmentDto?: UpdatePaymentInstallmentDto,
    id?: number,
  ) {
    if (updatePaymentInstallmentDto && id) {
      this.id = id;
      this.isPaid = updatePaymentInstallmentDto.isPaid;
      this.paymentDate = new Date(updatePaymentInstallmentDto.paymentDate);
      this.paymentValue = updatePaymentInstallmentDto.paymentValue;
      const project = new Project();
      project.id = updatePaymentInstallmentDto.projectId;
      this.project = project;
    }
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  isPaid: boolean;

  @Column({ nullable: true })
  paymentDate: Date;

  @Column({ nullable: true })
  paymentValue: number;

  @ManyToOne(() => Project, (project) => project.paymentInstallments, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  project: Project;
}
