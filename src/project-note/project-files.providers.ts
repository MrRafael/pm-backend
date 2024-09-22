import { DataSource } from 'typeorm';
import { databaseConstants } from 'src/database/constants';
import { projectNotesConstants } from './constants';
import { ProjectNote } from './entities/project-note.entity';

export const projectNotesProviders = [
  {
    provide: projectNotesConstants.providerName,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ProjectNote),
    inject: [databaseConstants.providerName],
  },
];
