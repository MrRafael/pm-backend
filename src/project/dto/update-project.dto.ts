import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './create-project.dto';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  status: 'waitingApproval' | 'approved' | 'inProgress' | 'finished' | 'paid';
}
