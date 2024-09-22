import { Inject, Injectable, StreamableFile } from '@nestjs/common';
import { projectFilesConstants } from './constants';
import { ProjectFile } from './entities/project-file.entity';
import { Repository } from 'typeorm';
import { CreateProjectFileDto } from './dto/create-project-file.dto';
import { Project } from 'src/project/entities/project.entity';
import { FileCategory } from 'src/file-category/entities/file-category.entity';
import { createReadStream, unlinkSync } from 'fs';
import { join } from 'path';

@Injectable()
export class ProjectFilesService {
  constructor(
    @Inject(projectFilesConstants.providerName)
    private projectFilesRepository: Repository<ProjectFile>,
  ) {}

  create(
    createProjectFileDto: CreateProjectFileDto,
    file: Express.Multer.File,
  ) {
    const projectFile = new ProjectFile();
    projectFile.fileName = file.filename;
    projectFile.originalName = file.originalname;
    projectFile.mimetype = file.mimetype;
    projectFile.path = file.path;
    const project = new Project();
    const category = new FileCategory();
    project.id = createProjectFileDto.projectId;
    category.id = createProjectFileDto.categoryId;
    projectFile.project = project;
    projectFile.fileCategory = category;
    return this.projectFilesRepository.save(projectFile);
  }

  findAll(projectId: string) {
    const project = new Project();
    project.id = projectId;
    return this.projectFilesRepository.find({ where: { project } });
  }

  async findOne(id: number) {
    const files = await this.projectFilesRepository.findBy({ id });
    return files[0];
  }

  async download(id: number) {
    const file = await this.findOne(id);
    const fileToDownload = createReadStream(join(process.cwd(), file.path));
    return new StreamableFile(fileToDownload, {
      type: file.mimetype,
      disposition: 'attachment; filename="' + file.originalName + '"',
    });
  }

  async remove(id: number) {
    const template = await this.findOne(id);
    unlinkSync(template.path);
    return this.projectFilesRepository.delete(id);
  }
}
