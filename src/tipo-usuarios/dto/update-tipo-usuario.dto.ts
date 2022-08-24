import { PartialType } from '@nestjs/swagger';
import { CreateTipoUsuarioDto } from './create-tipo-usuario.dto';

export class UpdateTipoUsuarioDto extends PartialType(CreateTipoUsuarioDto) {}
