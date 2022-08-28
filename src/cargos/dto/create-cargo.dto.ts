import { IsString } from 'class-validator';

export class CreateCargoDto {
  @IsString()
  nombre: string;
}
