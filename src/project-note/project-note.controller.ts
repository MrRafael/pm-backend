import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { ProjectNoteService } from './project-note.service';
import { CreateProjectNoteDto } from './dto/create-project-note.dto';

@Controller('project-note')
export class ProjectNoteController {
  constructor(private readonly projectNoteService: ProjectNoteService) {}

  @Post()
  create(@Body() createProjectNoteDto: CreateProjectNoteDto, @Request() req) {
    return this.projectNoteService.create(createProjectNoteDto, req.headers);
  }

  @Get()
  findAll() {
    return this.projectNoteService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.projectNoteService.remove(+id, req.headers);
  }
}
