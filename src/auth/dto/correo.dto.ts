import { IsEmail } from 'class-validator';

export class CorreoDto {
  @IsEmail()
  correo: string;
}
