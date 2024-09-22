import { IsNumberString, IsString } from 'class-validator';

export class CreateProjectFileDto {
  @IsNumberString()
  readonly categoryId: number;

  @IsString()
  readonly projectId: string;
}
