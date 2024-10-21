import { Inject, Injectable } from '@nestjs/common';
import { CreateFileCategoryDto } from './dto/create-file-category.dto';
import { FileCategory } from './entities/file-category.entity';
import { Equal, Repository } from 'typeorm';
import { fileCategoryConstants } from './constants';

@Injectable()
export class FileCategoryService {
  constructor(
    @Inject(fileCategoryConstants.providerName)
    private fileCategoryRepository: Repository<FileCategory>,
  ) {}
  create(createFileCategoryDto: CreateFileCategoryDto) {
    return this.fileCategoryRepository.save(createFileCategoryDto);
  }

  findAll() {
    return this.fileCategoryRepository.find();
  }

  async findOne(id: number) {
    const categories = await this.fileCategoryRepository.find({
      where: { id: Equal(id) },
    });
    return categories[0];
  }

  remove(id: number) {
    return this.fileCategoryRepository.delete(id);
  }
}
