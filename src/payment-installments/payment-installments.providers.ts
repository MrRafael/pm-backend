import { DataSource } from 'typeorm';
import { databaseConstants } from 'src/database/constants';
import { paymentInstallmentConstants } from './constants';
import { PaymentInstallment } from './entities/payment-installment.entity';

export const paymentInstallmentProviders = [
  {
    provide: paymentInstallmentConstants.providerName,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(PaymentInstallment),
    inject: [databaseConstants.providerName],
  },
];
