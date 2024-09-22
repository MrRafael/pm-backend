import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentInstallmentDto } from './create-payment-installment.dto';

export class UpdatePaymentInstallmentDto extends PartialType(
  CreatePaymentInstallmentDto,
) {
  readonly percent: number;
  readonly paidAt: Date;
  readonly paidValue: number;
  readonly projectId: string;
}
