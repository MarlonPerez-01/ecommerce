import { PartialType } from '@nestjs/swagger';
import { CreateCuponDto } from './create-cupon.dto';

export class UpdateCuponeDto extends PartialType(CreateCuponDto) {}
