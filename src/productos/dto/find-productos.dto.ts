import { IsArray, IsIn, IsNumber, IsOptional } from 'class-validator';

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

export class FindProductosDTO extends PaginationQueryDto {
  @IsOptional()
  @IsIn(['id', 'nombre'])
  sort?: 'id' | 'nombre' | 'precioTienda' | 'precioVenta' | 'disponible' = 'id';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc' = 'asc';

  @IsOptional()
  @IsNumber()
  minPrice?: number;

  @IsOptional()
  @IsNumber()
  maxPrice?: number;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  marcas: number[];
}
