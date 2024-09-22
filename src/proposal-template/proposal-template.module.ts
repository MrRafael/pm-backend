import { Module } from '@nestjs/common';
import { ProposalTemplateService } from './proposal-template.service';
import { ProposalTemplateController } from './proposal-template.controller';
import { DatabaseModule } from 'src/database/database.module';
import { proposalTemplateProviders } from './proposal-template.providers';
import { ProjectModule } from 'src/project/project.module';

@Module({
  imports: [DatabaseModule, ProjectModule],
  controllers: [ProposalTemplateController],
  providers: [...proposalTemplateProviders, ProposalTemplateService],
  exports: [ProposalTemplateService],
})
export class ProposalTemplateModule {}
