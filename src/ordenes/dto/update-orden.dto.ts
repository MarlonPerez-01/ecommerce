import { PartialType } from '@nestjs/swagger';
import { CreateOrdenDto } from './create-orden.dto';

export class UpdateOrdenDto extends PartialType(CreateOrdenDto) {}
