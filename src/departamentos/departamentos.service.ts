import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';
import { Departamento } from './entities/departamento.entity';

@Injectable()
export class DepartamentosService {
  constructor(
    @InjectRepository(Departamento)
    private readonly departamentoRepository: Repository<Departamento>,
  ) {}

  create(createDepartamentoDto: CreateDepartamentoDto) {
    return 'This action adds a new departamento';
  }

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

  update(id: number, updateDepartamentoDto: UpdateDepartamentoDto) {
    return `This action updates a #${id} departamento`;
  }

  remove(id: number) {
    return `This action removes a #${id} departamento`;
  }
}
