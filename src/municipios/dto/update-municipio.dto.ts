import { PartialType } from '@nestjs/swagger';
import { CreateMunicipioDto } from './create-municipio.dto';

export class UpdateMunicipioDto extends PartialType(CreateMunicipioDto) {}
