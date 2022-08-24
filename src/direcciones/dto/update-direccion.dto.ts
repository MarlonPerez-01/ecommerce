import { PartialType } from '@nestjs/swagger';
import { CreateDireccionDto } from './create-direccion.dto';

export class UpdateDireccionDto extends PartialType(CreateDireccionDto) {}
