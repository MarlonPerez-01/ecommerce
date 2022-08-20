import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateProductoDto {
  @IsString()
  nombre: string;

  @IsString()
  sku: string;

  @IsNumber()
  precioTienda: number;

  @IsNumber()
  precioVenta: number;

  @IsString()
  descripcion: string;

  @IsBoolean()
  disponible: boolean;
}
