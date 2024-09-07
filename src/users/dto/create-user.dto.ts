import { IsNotEmpty, IsEmail, IsOptional } from 'class-validator';
import { Role } from 'src/enums/role.enum';

export class CreateUserDto {
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsOptional()
  readonly roles: Role[];
}
