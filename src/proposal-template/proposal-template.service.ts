import { Inject, Injectable } from '@nestjs/common';
import { ProposalTemplate } from './entities/proposal-template.entity';
import { Repository } from 'typeorm';
import { proposalTemplateConstants } from './constants';
import * as fs from 'fs';

@Injectable()
export class ProposalTemplateService {
  constructor(
    @Inject(proposalTemplateConstants.providerName)
    private proposalRepository: Repository<ProposalTemplate>,
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

  async remove(id: number) {
    const template = await this.findOne(id);
    fs.unlinkSync(template.path);
    return this.proposalRepository.delete(id);
  }
}
