import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Municipio } from './entities/municipio.entity';

@Injectable()
export class MunicipiosService {
  constructor(
    @InjectRepository(Municipio)
    private readonly municipioRepository: Repository<Municipio>,
  ) {}

  async findAll() {
    return this.municipioRepository.find();
  }

  async findOne(id: number) {
    return this.municipioRepository.findOne({ where: { id } });
  }
}
