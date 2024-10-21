import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentInstallmentDto } from './create-payment-installment.dto';

export class UpdatePaymentInstallmentDto extends PartialType(
  CreatePaymentInstallmentDto,
) {
  readonly isPaid: boolean;
  readonly paymentDate: Date;
  readonly paymentValue: number;
  readonly projectId: string;
}
