import { DataSource } from 'typeorm';
import { databaseConstants } from 'src/database/constants';
import { projectConstants } from './constants';
import { Project } from './entities/project.entity';

export const projectProviders = [
  {
    provide: projectConstants.providerName,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Project),
    inject: [databaseConstants.providerName],
  },
];
