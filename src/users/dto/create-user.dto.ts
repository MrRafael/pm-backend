import { IsNotEmpty, IsEmail, IsString } from 'class-validator';
import { Role } from 'src/enums/role.enum';

export class CreateUserDto {
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly roles: Role[];

  @IsNotEmpty()
  @IsString()
  password: string;
}
