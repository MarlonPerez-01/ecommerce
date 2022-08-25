import { Injectable } from '@nestjs/common';
import { CreateCuponeDto } from './dto/create-cupone.dto';
import { UpdateCuponeDto } from './dto/update-cupone.dto';

@Injectable()
export class CuponesService {
  create(createCuponeDto: CreateCuponeDto) {
    return 'This action adds a new cupone';
  }

  findAll() {
    return `This action returns all cupones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cupone`;
  }

  update(id: number, updateCuponeDto: UpdateCuponeDto) {
    return `This action updates a #${id} cupone`;
  }

  remove(id: number) {
    return `This action removes a #${id} cupone`;
  }
}
