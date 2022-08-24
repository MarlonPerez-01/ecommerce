import { Injectable } from '@nestjs/common';
import { CreateDireccionDto } from './dto/create-direccion.dto';
import { UpdateDireccionDto } from './dto/update-direccion.dto';

@Injectable()
export class DireccionesService {
  create(createDireccioneDto: CreateDireccionDto) {
    return 'This action adds a new direccione';
  }

  findAll() {
    return `This action returns all direcciones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} direccione`;
  }

  update(id: number, updateDireccioneDto: UpdateDireccionDto) {
    return `This action updates a #${id} direccione`;
  }

  remove(id: number) {
    return `This action removes a #${id} direccione`;
  }
}
