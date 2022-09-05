import { IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateComentarioDto {
  @IsNumber()
  @IsPositive()
  productoId: number;

  @IsString()
  comentario: string;

  @IsNumber()
  @IsPositive()
  puntuacion: number;
}
