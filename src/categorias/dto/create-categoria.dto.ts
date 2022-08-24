import { IsString, MinLength } from 'class-validator';

export class CreateCategoriaDto {
  @IsString()
  @MinLength(3)
  nombre: string;
}
