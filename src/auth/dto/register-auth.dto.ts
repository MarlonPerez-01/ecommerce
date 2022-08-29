import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { DireccionAuthDto } from './direccion-auth.dto';

export class RegisterAuthDto {
  @IsString()
  correo: string;

  @IsString()
  contrasenia: string;

  @IsNotEmpty()
  @ValidateNested()
  direccion: DireccionAuthDto;
}
