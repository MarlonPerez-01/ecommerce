import { Injectable } from '@nestjs/common';
import { CreateCodigoDto } from './dto/create-codigo.dto';
import { UpdateCodigoDto } from './dto/update-codigo.dto';

@Injectable()
export class CodigosService {
  create(createCodigoDto: CreateCodigoDto) {
    return 'This action adds a new codigo';
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
