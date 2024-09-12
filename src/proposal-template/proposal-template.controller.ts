import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
} from '@nestjs/common';
import { ProposalTemplateService } from './proposal-template.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('proposal-template')
export class ProposalTemplateController {
  constructor(
    private readonly proposalTemplateService: ProposalTemplateService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', { dest: './uploads' }))
  create(
    @UploadedFile(new ParseFilePipe())
    file: Express.Multer.File,
  ) {
    return this.proposalTemplateService.create(file);
  }

  @Get()
  findAll() {
    return this.proposalTemplateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.proposalTemplateService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.proposalTemplateService.remove(+id);
  }
}
