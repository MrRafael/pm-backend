import { Inject, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { projectConstants } from './constants';
import { Raw, Repository } from 'typeorm';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @Inject(projectConstants.providerName)
    private projectRepository: Repository<Project>,
  ) {}

  create(createProjectDto: CreateProjectDto) {
    const projectToSave = new Project(createProjectDto);
    return this.projectRepository.save(projectToSave, {});
  }

  async findAll(take: number, skip: number, keyword: string) {
    const options = {
      take: take,
      skip: skip,
      relations: { client: true, paymentInstallments: true },
    };

    if (keyword !== '') {
      keyword = keyword.toLowerCase();
      options['where'] = {
        title: Raw((alias) => `LOWER(${alias}) Like '%${keyword}%'`),
      };
    }

    const [data, result] = await this.projectRepository.findAndCount(options);
    return { result, data };
  }

  async findOne(id: string) {
    const projects = await this.projectRepository.find({
      where: { id },
      relations: {
        client: true,
        paymentInstallments: true,
        files: { fileCategory: true },
        notes: { user: true },
      },
      order: { paymentInstallments: { id: 'ASC' } },
    });
    return projects[0];
  }

  update(id: string, updateProjectDto: UpdateProjectDto) {
    const projectToUpdate = { ...updateProjectDto, id };
    if (updateProjectDto.status === 'approved') {
      projectToUpdate['approvalDate'] = new Date();
    }
    return this.projectRepository.save(projectToUpdate);
  }

  remove(id: string) {
    return this.projectRepository.delete(id);
  }
}
