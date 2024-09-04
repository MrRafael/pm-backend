import { IsNotEmpty, IsStrongPassword } from 'class-validator';

export class CompleteUserDto {
  @IsNotEmpty()
  readonly accessCode: string;

  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  readonly password: string;
}
