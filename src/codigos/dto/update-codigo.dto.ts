import { PartialType } from '@nestjs/swagger';

import { CreateCodigoDto } from './create-codigo.dto';

export class UpdateCodigoDto extends PartialType(CreateCodigoDto) {}
