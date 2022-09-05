import { PartialType } from '@nestjs/swagger';

import { CreateRolesDto } from './create-roles.dto';

export class UpdateRolesDto extends PartialType(CreateRolesDto) {}
