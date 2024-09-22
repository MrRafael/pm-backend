import { Inject, Injectable } from '@nestjs/common';
import { CreatePaymentInstallmentDto } from './dto/create-payment-installment.dto';
import { UpdatePaymentInstallmentDto } from './dto/update-payment-installment.dto';
import { paymentInstallmentConstants } from './constants';
import { Repository } from 'typeorm';
import { PaymentInstallment } from './entities/payment-installment.entity';

@Injectable()
export class PaymentInstallmentsService {
  constructor(
    @Inject(paymentInstallmentConstants.providerName)
    private paymentRepository: Repository<PaymentInstallment>,
  ) {}

  create(createPaymentInstallmentDto: CreatePaymentInstallmentDto) {
    return 'This action adds a new paymentInstallment';
  }

  findAll() {
    return `This action returns all paymentInstallments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paymentInstallment`;
  }

  update(id: number, updatePaymentInstallmentDto: UpdatePaymentInstallmentDto) {
    const payment = new PaymentInstallment(updatePaymentInstallmentDto, id);
    console.log(payment);
    return this.paymentRepository.save(payment);
  }

  remove(id: number) {
    return `This action removes a #${id} paymentInstallment`;
  }
}
