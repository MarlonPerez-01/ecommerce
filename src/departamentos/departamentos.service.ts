import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Departamento } from './entities/departamento.entity';

@Injectable()
export class DepartamentosService {
  constructor(
    @InjectRepository(Departamento)
    private readonly departamentoRepository: Repository<Departamento>,
  ) {}

  async findAll() {
    return this.departamentoRepository.find();
  }

  async findOne(id: number) {
    const departamento = await this.departamentoRepository.findOne({
      where: { id },
      relations: ['municipios'],
    });

    if (!departamento) throw new NotFoundException();
    return departamento;
  }
}
