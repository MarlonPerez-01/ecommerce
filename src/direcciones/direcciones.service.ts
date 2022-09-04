import { Injectable } from '@nestjs/common';
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

  async create(createDireccionDto: CreateDireccionDto) {
    const direccion = this.direccionRepository.create(createDireccionDto);
    return this.direccionRepository.save(direccion);
  }

  async findAll() {
    return `This action returns all direcciones`;
  }

  async findOne(id: number) {
    return this.direccionRepository.findOne({ where: { id } });
  }

  async update(id: number, updateDireccionDto: UpdateDireccionDto) {
    return `This action updates a #${id} direccione`;
  }

  async remove(id: number) {
    return this.direccionRepository.delete(id);
  }
}
