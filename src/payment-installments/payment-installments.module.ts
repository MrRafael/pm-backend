import { Module } from '@nestjs/common';
import { PaymentInstallmentsService } from './payment-installments.service';
import { PaymentInstallmentsController } from './payment-installments.controller';
import { DatabaseModule } from 'src/database/database.module';
import { paymentInstallmentProviders } from './payment-installments.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [PaymentInstallmentsController],
  providers: [...paymentInstallmentProviders, PaymentInstallmentsService],
  exports: [PaymentInstallmentsService],
})
export class PaymentInstallmentsModule {}
