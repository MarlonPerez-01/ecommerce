import { Injectable } from '@nestjs/common';

import { CreateOrdenDto } from './dto/create-orden.dto';
import { UpdateOrdenDto } from './dto/update-orden.dto';

@Injectable()
export class OrdenesService {
  create(createOrdeneDto: CreateOrdenDto) {
    return 'This action adds a new ordene';
  }

  findAll() {
    return `This action returns all ordenes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ordene`;
  }

  update(id: number, updateOrdeneDto: UpdateOrdenDto) {
    return `This action updates a #${id} ordene`;
  }

  remove(id: number) {
    return `This action removes a #${id} ordene`;
  }
}
