import { PartialType } from '@nestjs/swagger';
import { CreateProductoDto } from './create-producto.dto';

export class UpdateProductoDto extends PartialType(CreateProductoDto) {}
