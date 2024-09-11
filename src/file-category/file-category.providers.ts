import { DataSource } from 'typeorm';
import { databaseConstants } from 'src/database/constants';
import { fileCategoryConstants } from './constants';
import { FileCategory } from './entities/file-category.entity';

export const fileCategoryProviders = [
  {
    provide: fileCategoryConstants.providerName,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(FileCategory),
    inject: [databaseConstants.providerName],
  },
];
