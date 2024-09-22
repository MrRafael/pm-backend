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
      this.percent = updatePaymentInstallmentDto.percent;
      this.paidAt = new Date(updatePaymentInstallmentDto.paidAt);
      this.paidValue = updatePaymentInstallmentDto.paidValue;
      const project = new Project();
      project.id = updatePaymentInstallmentDto.projectId;
      this.project = project;
    }
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  percent: number;

  @Column({ nullable: true })
  paidAt: Date;

  @Column({ nullable: true })
  paidValue: number;

  @ManyToOne(() => Project, (project) => project.paymentInstallments, {
    onDelete: 'CASCADE',
  })
  project: Project;
}
