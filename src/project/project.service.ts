import { Inject, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { projectConstants } from './constants';
import { IsNull, Not, Raw, Repository, In, Equal } from 'typeorm';
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

  async findAll(
    take: number,
    skip: number,
    keyword: string,
    filter: { status: string[] },
  ) {
    const options = {
      take: take,
      skip: skip,
      relations: { client: true, paymentInstallments: true },
    };

    const where = {};
    let addWhere = false;
    if (keyword !== '') {
      keyword = keyword.toLowerCase();
      where['title'] = Raw((alias) => `LOWER(${alias}) Like '%${keyword}%'`);
      addWhere = true;
    }

    if (filter.status.length > 0) {
      keyword = keyword.toLowerCase();
      where['status'] = In(filter.status);
      addWhere = true;
    }

    if (addWhere) {
      options['where'] = where;
    }

    const total = await this.selecCalc();
    const approved = await this.selecCalc(true);

    const [data, result] = await this.projectRepository.findAndCount(options);
    return { result, data, calc: { total, approved } };
  }

  async selecCalc(onlyApproved: boolean = false) {
    const where = { approvalDate: Not(IsNull()) };
    return this.projectRepository.sum('value', onlyApproved ? where : {});
  }

  async findOne(id: string) {
    const projects = await this.projectRepository.find({
      where: { id: Equal(id) },
      relations: {
        client: true,
        paymentInstallments: true,
        customFields: true,
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
