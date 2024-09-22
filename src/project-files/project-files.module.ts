import { Module } from '@nestjs/common';
import { ProjectFilesService } from './project-files.service';
import { ProjectFilesController } from './project-files.controller';
import { DatabaseModule } from 'src/database/database.module';
import { projectFilesProviders } from './project-files.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ProjectFilesController],
  providers: [...projectFilesProviders, ProjectFilesService],
  exports: [ProjectFilesService],
})
export class ProjectFilesModule {}
