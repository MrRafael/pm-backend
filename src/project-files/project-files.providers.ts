import { DataSource } from 'typeorm';
import { databaseConstants } from 'src/database/constants';
import { projectFilesConstants } from './constants';
import { ProjectFile } from './entities/project-file.entity';

export const projectFilesProviders = [
  {
    provide: projectFilesConstants.providerName,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ProjectFile),
    inject: [databaseConstants.providerName],
  },
];
