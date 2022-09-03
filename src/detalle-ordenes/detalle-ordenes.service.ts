import { Injectable } from '@nestjs/common';

import { CreateDetalleOrdenDto } from './dto/create-detalle-orden.dto';
import { UpdateDetalleOrdenDto } from './dto/update-detalle-orden.dto';

@Injectable()
export class DetalleOrdenesService {
  create(createDetalleOrdeneDto: CreateDetalleOrdenDto) {
    return 'This action adds a new detalleOrdene';
  }

  findAll() {
    return `This action returns all detalleOrdenes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} detalleOrdene`;
  }

  update(id: number, updateDetalleOrdeneDto: UpdateDetalleOrdenDto) {
    return `This action updates a #${id} detalleOrdene`;
  }

  remove(id: number) {
    return `This action removes a #${id} detalleOrdene`;
  }
}
