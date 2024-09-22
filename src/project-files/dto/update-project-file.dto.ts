import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectFileDto } from './create-project-file.dto';

export class UpdateProjectFileDto extends PartialType(CreateProjectFileDto) {}
