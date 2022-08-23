import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductoDto {
  @IsString()
  nombre: string;

  @IsString()
  sku: string;

  @IsString()
  slug: string;

  @IsString()
  marca: string;

  @IsString()
  categoria: string;

  @IsOptional()
  @IsNumber()
  proveedor: number;

  @IsOptional()
  @IsObject()
  propiedades: object;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  imagenes: string[];

  @IsNumber()
  precioTienda: number;

  @IsNumber()
  precioVenta: number;

  @IsOptional()
  @IsString()
  descripcion: string;

  @IsBoolean()
  estado: boolean;
}
