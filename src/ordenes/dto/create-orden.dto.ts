import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';

import { CreateDetalleOrdenDto } from '../../detalle-ordenes/dto/create-detalle-orden.dto';

export class CreateOrdenDto {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => CreateDetalleOrdenDto)
  detalleOrdenes: CreateDetalleOrdenDto[];
}
