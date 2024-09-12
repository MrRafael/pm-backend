import { DataSource } from 'typeorm';
import { databaseConstants } from 'src/database/constants';
import { proposalTemplateConstants } from './constants';
import { ProposalTemplate } from './entities/proposal-template.entity';

export const proposalTemplateProviders = [
  {
    provide: proposalTemplateConstants.providerName,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ProposalTemplate),
    inject: [databaseConstants.providerName],
  },
];
