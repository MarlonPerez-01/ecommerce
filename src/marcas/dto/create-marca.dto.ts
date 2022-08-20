import { IsString, MinLength } from 'class-validator';

export class CreateMarcaDto {
  @IsString()
  @MinLength(2)
  nombre: string;

  @IsString()
  imagen: string;
}
