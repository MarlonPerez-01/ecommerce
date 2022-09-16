import { IsDefined, IsString, MinLength } from 'class-validator';

export class CambiarContraseniaDto {
  @IsDefined()
  codigo: string;

  @IsString()
  @MinLength(8)
  contrasenia: string;
}
