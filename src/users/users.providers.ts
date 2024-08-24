import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { databaseConstants } from 'src/database/constants';
import { usersConstants } from './constants';

export const userProviders = [
  {
    provide: usersConstants.providerName,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: [databaseConstants.providerName],
  },
];
