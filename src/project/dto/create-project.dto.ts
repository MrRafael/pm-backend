import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CustomField } from 'src/custom-field/entities/custom-field.entity';
import { PaymentInstallment } from 'src/payment-installments/entities/payment-installment.entity';

export class CreateProjectDto {
  @IsNumber()
  readonly clientId: number;

  @IsNumber()
  @IsOptional()
  readonly value: number;

  @IsString()
  @IsOptional()
  readonly title: string;

  @IsString()
  @IsOptional()
  readonly considerations: string;

  @IsString()
  @IsOptional()
  readonly object: string;

  @IsString()
  @IsOptional()
  readonly product: string;

  @IsString()
  @IsOptional()
  readonly employeeName: string;

  @IsString()
  @IsOptional()
  readonly employeePhone: string;

  @IsString()
  @IsOptional()
  readonly deliveryTime: string;

  @IsString()
  @IsOptional()
  readonly paymentMethod: string;

  readonly paymentInstallments: PaymentInstallment[];

  readonly customFields: CustomField[];
}
