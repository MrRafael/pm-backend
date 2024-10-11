import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { FileCategoryService } from './file-category.service';
import { CreateFileCategoryDto } from './dto/create-file-category.dto';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/enums/role.enum';

@Controller('file-category')
export class FileCategoryController {
  constructor(private readonly fileCategoryService: FileCategoryService) {}

  @Post()
  @Roles(Role.Admin)
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
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.fileCategoryService.remove(+id);
  }
}
