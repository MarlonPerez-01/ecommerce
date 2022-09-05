import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';
import { Comentario } from './entities/comentario.entity';

@Injectable()
export class ComentariosService {
  constructor(
    @InjectRepository(Comentario)
    private readonly comentarioRepository: Repository<Comentario>,
  ) {}

  async create(createComentarioDto: CreateComentarioDto) {
    const comentario = this.comentarioRepository.create(createComentarioDto);
    return this.comentarioRepository.save(comentario);
  }

  async findAll() {
    return `This action returns all comentarios`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} comentario`;
  }

  async findByProductoId(productoId: number) {
    return this.comentarioRepository.find({ where: { productoId } });
  }

  async update(id: number, updateComentarioDto: UpdateComentarioDto) {
    return `This action updates a #${id} comentario`;
  }

  async remove(id: number) {
    return `This action removes a #${id} comentario`;
  }
}
