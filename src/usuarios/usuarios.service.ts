import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
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
    const usuario = await this.usuariosRepository.findOneBy({ id });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');
    return usuario;
  }

  async findOneWithCliente(id: number) {
    return this.usuariosRepository.findOne({
      where: { id },
      relations: ['persona', 'persona.cliente'],
      relationLoadStrategy: 'join',
    });
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.findOne(id);
    if (!usuario) throw new NotFoundException('Usuario no encontrado');
    return this.usuariosRepository.save({
      ...usuario,
      ...updateUsuarioDto,
    });
  }

  async remove(id: number) {
    return this.usuariosRepository.softDelete(id);
  }

  async changePassword(
    id: number,
    contrasenia: string,
    nuevaContrasenia: string,
  ) {
    const usuario = await this.findOne(id);
    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    const match = await bcrypt.compare(contrasenia, usuario.contrasenia);
    if (!match) throw new BadRequestException('Contraseña incorrecta');

    const hash = await bcrypt.hash(nuevaContrasenia, 10);

    return this.usuariosRepository.save({ id, contrasenia: hash });
  }
}
