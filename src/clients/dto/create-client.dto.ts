import { IsEmail, IsString } from 'class-validator';

export class CreateClientDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly cnpj: string;

  @IsString()
  readonly phone: string;

  @IsString()
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly address: string;
}
