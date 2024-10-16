import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
} from '@nestjs/common';
import { ProjectFilesService } from './project-files.service';
import { CreateProjectFileDto } from './dto/create-project-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('project-files')
export class ProjectFilesController {
  constructor(private readonly projectFilesService: ProjectFilesService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: function (req, file, cb) {
          cb(null, '/var/data');
        },
        filename: function (req, file, cb) {
          cb(null, Date.now() + '-' + file.originalname);
        },
      }),
    }),
  )
  create(
    @Body() createProjectFileDto: CreateProjectFileDto,
    @UploadedFile(new ParseFilePipe())
    file: Express.Multer.File,
  ) {
    return this.projectFilesService.create(createProjectFileDto, file);
  }

  @Get(':projectId')
  findAll(@Param('projectId') projectId: string) {
    return this.projectFilesService.findAll(projectId);
  }

  @Get('/download/:id')
  download(@Param('id') id: string) {
    return this.projectFilesService.download(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectFilesService.remove(+id);
  }
}
