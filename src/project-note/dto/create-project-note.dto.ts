import { IsString } from 'class-validator';

export class CreateProjectNoteDto {
  @IsString()
  readonly note: string;

  @IsString()
  readonly projectId: string;
}
