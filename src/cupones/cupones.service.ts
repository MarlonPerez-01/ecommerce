import { Injectable } from '@nestjs/common';
import { CreateCuponDto } from './dto/create-cupon.dto';
import { UpdateCuponeDto } from './dto/update-cupon.dto';

@Injectable()
export class CuponesService {
  create(createCuponeDto: CreateCuponDto) {
    return 'This action adds a new cupon';
  }

  findAll() {
    return `This action returns all cupones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cupon`;
  }

  update(id: number, updateCuponeDto: UpdateCuponeDto) {
    return `This action updates a #${id} cupon`;
  }

  remove(id: number) {
    return `This action removes a #${id} cupon`;
  }
}
