import {
  BadRequestException,
  Inject,
  Injectable,
  StreamableFile,
} from '@nestjs/common';
import { ProposalTemplate } from './entities/proposal-template.entity';
import { Repository } from 'typeorm';
import { proposalTemplateConstants } from './constants';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { readFileSync, unlinkSync } from 'fs';
import { join } from 'path';
import { ProjectService } from 'src/project/project.service';

@Injectable()
export class ProposalTemplateService {
  constructor(
    @Inject(proposalTemplateConstants.providerName)
    private proposalRepository: Repository<ProposalTemplate>,
    private projectService: ProjectService,
  ) {}

  create(file: Express.Multer.File) {
    const proposal = new ProposalTemplate();
    proposal.fileName = file.filename;
    proposal.originalName = file.originalname;
    proposal.mimetype = file.mimetype;
    proposal.path = file.path;
    return this.proposalRepository.save(proposal);
  }

  findAll() {
    return this.proposalRepository.find();
  }

  async findOne(id: number) {
    const proposals = await this.proposalRepository.find({ where: { id } });
    return proposals[0];
  }

  async download(proposalId: number, projectId: string) {
    const proposal = await this.findOne(proposalId);
    const content = readFileSync(join(process.cwd(), proposal.path), 'binary');

    if (!proposal.originalName.endsWith('.docx')) {
      throw new BadRequestException();
    }

    const project = await this.projectService.findOne(projectId);
    const zip = new PizZip(content);

    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    const clientValues = {};
    Object.keys(project.client).forEach((key) => {
      clientValues[`client_${key}`] = project.client[key];
    });

    doc.render({ ...project, ...clientValues });

    const buf = doc.getZip().generate({
      type: 'nodebuffer',
      compression: 'DEFLATE',
    });

    return new StreamableFile(buf);
  }

  async remove(id: number) {
    const template = await this.findOne(id);
    unlinkSync(template.path);
    return this.proposalRepository.delete(id);
  }
}
