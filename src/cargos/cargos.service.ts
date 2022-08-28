import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCargoDto } from './dto/create-cargo.dto';
import { UpdateCargoDto } from './dto/update-cargo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cargo } from './entities/cargo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CargosService {
  constructor(
    @InjectRepository(Cargo)
    private readonly cargoRepository: Repository<Cargo>,
  ) {}

  async create(createCargoDto: CreateCargoDto) {
    return this.cargoRepository.create(createCargoDto);
  }

  async findAll() {
    return this.cargoRepository.find();
  }

  async findOne(id: number) {
    const cargo = this.cargoRepository.findOne({ where: { id } });
    if (!cargo) throw new NotFoundException();
    return cargo;
  }

  async update(id: number, updateCargoDto: UpdateCargoDto) {
    const cargo = await this.cargoRepository.preload({ id, ...updateCargoDto });
    if (!cargo) throw new NotFoundException();
    return this.cargoRepository.save(cargo);
  }

  async remove(id: number) {
    return this.cargoRepository.softDelete({ id });
  }

  async findByNombre(nombre: string) {
    return this.cargoRepository.findOne({ where: { nombre } });
  }
}
