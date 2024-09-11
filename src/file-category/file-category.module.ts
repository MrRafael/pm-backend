import { Module } from '@nestjs/common';
import { FileCategoryService } from './file-category.service';
import { FileCategoryController } from './file-category.controller';
import { DatabaseModule } from 'src/database/database.module';
import { fileCategoryProviders } from './file-category.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [FileCategoryController],
  providers: [...fileCategoryProviders, FileCategoryService],
  exports: [FileCategoryService],
})
export class FileCategoryModule {}
