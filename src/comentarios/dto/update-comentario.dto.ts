import { PartialType } from '@nestjs/swagger';
import { CreateComentarioDto } from './create-comentario.dto';

export class UpdateComentarioDto extends PartialType(CreateComentarioDto) {}
