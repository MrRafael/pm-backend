import { IsNotEmpty, IsEmail } from 'class-validator';

export class ResetUserDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
}
