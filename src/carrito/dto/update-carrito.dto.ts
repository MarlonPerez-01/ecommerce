import { PartialType } from '@nestjs/swagger';
import { CreateCarritoDto } from './create-carrito.dto';

export class UpdateCarritoDto extends PartialType(CreateCarritoDto) {}
