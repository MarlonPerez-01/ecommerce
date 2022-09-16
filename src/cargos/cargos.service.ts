import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCargoDto } from './dto/create-cargo.dto';
import { UpdateCargoDto } from './dto/update-cargo.dto';
import { Cargo } from './entities/cargo.entity';

@Injectable()
export class CargosService {
  constructor(
    @InjectRepository(Cargo)
    private readonly cargoRepository: Repository<Cargo>,
  ) {}

  async create(createCargoDto: CreateCargoDto) {
    const cargo = this.cargoRepository.create(createCargoDto);
    return this.cargoRepository.save(cargo);
  }

  async findAll() {
    return this.cargoRepository.find();
  }

  async findOne(id: number) {
    const cargo = await this.cargoRepository.findOneBy({ id });
    if (!cargo) throw new NotFoundException('Cargo no encontrado');
    return cargo;
  }

  async update(id: number, updateCargoDto: UpdateCargoDto) {
    const cargo = await this.cargoRepository.preload({ id, ...updateCargoDto });
    if (!cargo) throw new NotFoundException('Cargo no encontrado');
    return this.cargoRepository.save(cargo);
  }

  async remove(id: number) {
    const cargo = await this.findOne(id);
    if (!cargo) throw new NotFoundException('Cargo no encontrado');
    return this.cargoRepository.softDelete({ id });
  }

  async findByNombre(nombre: string) {
    return this.cargoRepository.findOne({ where: { nombre } });
  }
}
