import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDescuentoDto } from './dto/create-descuento.dto';
import { UpdateDescuentoDto } from './dto/update-descuento.dto';
import { Descuento } from './entities/descuento.entity';

@Injectable()
export class DescuentosService {
  constructor(
    @InjectRepository(Descuento)
    private readonly descuentoRepository: Repository<Descuento>,
  ) {}

  async create(createDescuentoDto: CreateDescuentoDto) {
    const descuento = this.descuentoRepository.create(createDescuentoDto);
    return this.descuentoRepository.save(descuento);
  }

  findAll() {
    return `This action returns all descuentos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} descuento`;
  }

  async update(id: number, updateDescuentoDto: UpdateDescuentoDto) {
    const descuento = await this.descuentoRepository.preload({
      id,
      ...updateDescuentoDto,
    });

    return this.descuentoRepository.save(descuento);
  }

  remove(id: number) {
    return `This action removes a #${id} descuento`;
  }
}
