import { IsString } from 'class-validator';

export class CreateFileCategoryDto {
  @IsString()
  readonly name: string;
}
