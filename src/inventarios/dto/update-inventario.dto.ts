import { PartialType } from '@nestjs/swagger';
import { CreateInventarioDto } from './create-inventario.dto';

export class UpdateInventarioDto extends PartialType(CreateInventarioDto) {}
