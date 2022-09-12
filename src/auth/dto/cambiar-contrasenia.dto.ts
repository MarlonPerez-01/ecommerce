import { IsDefined, IsString } from 'class-validator';

export class CambiarContraseniaDto {
  @IsDefined()
  codigo: string;

  @IsString()
  contrasenia: string;
}
