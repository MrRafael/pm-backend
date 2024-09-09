import { DataSource } from 'typeorm';
import { Client } from './entities/client.entity';
import { databaseConstants } from 'src/database/constants';
import { clientsConstants } from './constants';

export const clientProviders = [
  {
    provide: clientsConstants.providerName,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Client),
    inject: [databaseConstants.providerName],
  },
];
