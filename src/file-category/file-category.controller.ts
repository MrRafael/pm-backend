import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { FileCategoryService } from './file-category.service';
import { CreateFileCategoryDto } from './dto/create-file-category.dto';

@Controller('file-category')
export class FileCategoryController {
  constructor(private readonly fileCategoryService: FileCategoryService) {}

  @Post()
  create(@Body() createFileCategoryDto: CreateFileCategoryDto) {
    return this.fileCategoryService.create(createFileCategoryDto);
  }

  @Get()
  findAll() {
    return this.fileCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileCategoryService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileCategoryService.remove(+id);
  }
}
