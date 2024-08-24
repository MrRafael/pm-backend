import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

type Roles = 'admin' | 'superAdmin' | 'worker';
export class CreateUserDto {
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly role: Roles;

  @IsNotEmpty()
  @IsString()
  password: string;
}
