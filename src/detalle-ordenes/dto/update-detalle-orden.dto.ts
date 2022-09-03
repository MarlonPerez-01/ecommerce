import { PartialType } from '@nestjs/swagger';

import { CreateDetalleOrdenDto } from './create-detalle-orden.dto';

export class UpdateDetalleOrdenDto extends PartialType(CreateDetalleOrdenDto) {}
