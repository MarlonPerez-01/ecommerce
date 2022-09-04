import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateMunicipioDto } from './dto/create-municipio.dto';
import { UpdateMunicipioDto } from './dto/update-municipio.dto';
import { Municipio } from './entities/municipio.entity';

@Injectable()
export class MunicipiosService {
  constructor(
    @InjectRepository(Municipio)
    private readonly municipioRepository: Repository<Municipio>,
  ) {}

  create(createMunicipioDto: CreateMunicipioDto) {
    return 'This action adds a new municipio';
  }

  async findAll() {
    return this.municipioRepository.find();
  }

  async findOne(id: number) {
    return this.municipioRepository.findOne({ where: { id } });
  }

  update(id: number, updateMunicipioDto: UpdateMunicipioDto) {
    return `This action updates a #${id} municipio`;
  }

  remove(id: number) {
    return `This action removes a #${id} municipio`;
  }
}
