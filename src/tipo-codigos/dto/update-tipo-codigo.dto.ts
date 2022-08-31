import { PartialType } from '@nestjs/swagger';
import { CreateTipoCodigoDto } from './create-tipo-codigo.dto';

export class UpdateTipoCodigoDto extends PartialType(CreateTipoCodigoDto) {}
