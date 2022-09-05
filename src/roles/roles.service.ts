import { Injectable } from '@nestjs/common';

import { CreateRolesDto } from './dto/create-roles.dto';
import { UpdateRolesDto } from './dto/update-roles.dto';

@Injectable()
export class RolesService {
  create(createRolesDto: CreateRolesDto) {
    return 'This action adds a new tipoUsuario';
  }

  findAll() {
    return `This action returns all tipoUsuarios`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tipoUsuario`;
  }

  update(id: number, updateRolesDto: UpdateRolesDto) {
    return `This action updates a #${id} tipoUsuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoUsuario`;
  }
}
