import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  Query,
} from '@nestjs/common';
import { ProposalTemplateService } from './proposal-template.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('proposal-template')
export class ProposalTemplateController {
  constructor(
    private readonly proposalTemplateService: ProposalTemplateService,
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: function (req, file, cb) {
          cb(null, process.env.FILE_LOCATION);
        },
        filename: function (req, file, cb) {
          cb(null, Date.now() + '-' + file.originalname);
        },
      }),
    }),
  )
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

  @Get('/download')
  download(
    @Query('proposalId') proposalId: number,
    @Query('projectId') projectId: string,
  ) {
    return this.proposalTemplateService.download(proposalId, projectId);
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
