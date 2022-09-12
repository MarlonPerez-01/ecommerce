import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ClientesService } from '../clientes/clientes.service';
import { UsuariosService } from '../usuarios/usuarios.service';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';
import { Comentario } from './entities/comentario.entity';

@Injectable()
export class ComentariosService {
  constructor(
    @InjectRepository(Comentario)
    private readonly comentarioRepository: Repository<Comentario>,
    private readonly clientesService: ClientesService,
    private readonly usuariosService: UsuariosService,
  ) {}

  async create(usuarioId: number, createComentarioDto: CreateComentarioDto) {
    const usuario = await this.usuariosService.findOneWithCliente(usuarioId);

    const comentario = this.comentarioRepository.create({
      cliente: usuario.persona.cliente,
      ...createComentarioDto,
    });
    return this.comentarioRepository.save(comentario);
  }

  async findOne(id: number) {
    return this.comentarioRepository.findOneBy({ id });
  }

  async findAllByProductoId(productoId: number) {
    return this.comentarioRepository.find({
      where: { productoId },
      relations: ['cliente', 'cliente.persona'],
    });
  }

  async update(
    id: number,
    usuarioId: number,
    updateComentarioDto: UpdateComentarioDto,
  ) {
    const usuario = await this.usuariosService.findOneWithCliente(usuarioId);

    return this.comentarioRepository
      .createQueryBuilder('comentario')
      .update()
      .set(updateComentarioDto)
      .where('id = :id', { id })
      .andWhere('productoId = :productoId', {
        productoId: updateComentarioDto.productoId,
      })
      .andWhere('clienteId = :clienteId', {
        clienteId: usuario.persona.cliente.id,
      })
      .execute();
  }

  async remove(id: number, usuarioId: number) {
    const usuario = await this.usuariosService.findOneWithCliente(usuarioId);

    const comentario = await this.comentarioRepository.findOne({
      where: {
        id,
        cliente: {
          id: usuario.persona.cliente.id,
        },
      },
    });

    if (!comentario) {
      throw new NotFoundException('Comentario no encontrado');
    }

    return this.comentarioRepository.softDelete(id);
  }
}
