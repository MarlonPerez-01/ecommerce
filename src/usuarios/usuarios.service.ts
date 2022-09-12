import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RoleEnum } from '../common/enums/role.enum';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,
  ) {}

  // TODO: validar que solo pueda crearlo un admin
  async create(createUsuarioDto: CreateUsuarioDto) {
    const usuario = this.usuariosRepository.create({
      persona: {
        id: createUsuarioDto.idPersona,
      },
      role: {
        role: RoleEnum.EMPLEADO,
      },
      correo: createUsuarioDto.correo,
      contrasenia: createUsuarioDto.contrasenia,
    });

    return this.usuariosRepository.save(usuario);
  }

  async findAll() {
    return this.usuariosRepository.find();
  }

  async findOne(id: number) {
    return this.usuariosRepository.findOneBy({ id });
  }

  async findOneWithCliente(id: number) {
    return this.usuariosRepository.findOne({
      where: { id },
      relations: ['persona', 'persona.cliente'],
      relationLoadStrategy: 'join',
    });
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  async remove(id: number) {
    return this.usuariosRepository.softDelete(id);
  }
}
