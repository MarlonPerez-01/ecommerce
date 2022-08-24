import { Injectable } from '@nestjs/common';
import { CreateTipoUsuarioDto } from './dto/create-tipo-usuario.dto';
import { UpdateTipoUsuarioDto } from './dto/update-tipo-usuario.dto';

@Injectable()
export class TipoUsuariosService {
  create(createTipoUsuarioDto: CreateTipoUsuarioDto) {
    return 'This action adds a new tipoUsuario';
  }

  findAll() {
    return `This action returns all tipoUsuarios`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tipoUsuario`;
  }

  update(id: number, updateTipoUsuarioDto: UpdateTipoUsuarioDto) {
    return `This action updates a #${id} tipoUsuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoUsuario`;
  }
}
