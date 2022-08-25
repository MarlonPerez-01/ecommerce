import { PartialType } from '@nestjs/swagger';
import { CreateCuponeDto } from './create-cupone.dto';

export class UpdateCuponeDto extends PartialType(CreateCuponeDto) {}
