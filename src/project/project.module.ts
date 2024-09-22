import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { DatabaseModule } from 'src/database/database.module';
import { projectProviders } from './project.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ProjectController],
  providers: [...projectProviders, ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {}
