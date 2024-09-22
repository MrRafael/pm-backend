import { Module } from '@nestjs/common';
import { ProjectNoteService } from './project-note.service';
import { ProjectNoteController } from './project-note.controller';
import { DatabaseModule } from 'src/database/database.module';
import { projectNotesProviders } from './project-files.providers';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [ProjectNoteController],
  providers: [...projectNotesProviders, ProjectNoteService],
  exports: [ProjectNoteService],
})
export class ProjectNoteModule {}
