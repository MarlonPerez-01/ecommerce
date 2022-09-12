import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCodigoDto } from './dto/create-codigo.dto';
import { UpdateCodigoDto } from './dto/update-codigo.dto';
import { Codigo } from './entities/codigo.entity';

@Injectable()
export class CodigosService {
  constructor(
    @InjectRepository(Codigo)
    private readonly codigoRepository: Repository<Codigo>,
  ) {}

  create(createCodigoDto: CreateCodigoDto) {
    return this.codigoRepository.save(createCodigoDto);
  }

  findAll() {
    return `This action returns all codigos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} codigo`;
  }

  update(id: number, updateCodigoDto: UpdateCodigoDto) {
    return `This action updates a #${id} codigo`;
  }

  remove(id: number) {
    return `This action removes a #${id} codigo`;
  }
}
