import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateDireccionDto } from './dto/create-direccion.dto';
import { UpdateDireccionDto } from './dto/update-direccion.dto';
import { Direccion } from './entities/direccion.entity';

@Injectable()
export class DireccionesService {
  constructor(
    @InjectRepository(Direccion)
    private readonly direccionRepository: Repository<Direccion>,
  ) {}

  async create(personaId: number, createDireccionDto: CreateDireccionDto) {
    const direccion = this.direccionRepository.create({
      ...createDireccionDto,
      personaId,
    });
    return this.direccionRepository.save(direccion);
  }

  async findAll() {
    return `This action returns all direcciones`;
  }

  async findOne(id: number) {
    return this.direccionRepository.findOne({ where: { id } });
  }

  async update(
    personaId: number,
    direccionId: number,
    updateDireccionDto: UpdateDireccionDto,
  ) {
    const direccion = await this.direccionRepository.findOneBy({
      id: direccionId,
      personaId,
    });

    if (!direccion) throw new NotFoundException('Direccion no encontrada');

    return this.direccionRepository.save({
      ...direccion,
      ...updateDireccionDto,
    });
  }

  async remove(id: number) {
    return this.direccionRepository.delete(id);
  }
}
