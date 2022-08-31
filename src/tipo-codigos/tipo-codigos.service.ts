import { Injectable } from '@nestjs/common';
import { CreateTipoCodigoDto } from './dto/create-tipo-codigo.dto';
import { UpdateTipoCodigoDto } from './dto/update-tipo-codigo.dto';

@Injectable()
export class TipoCodigosService {
  create(createTipoCodigoDto: CreateTipoCodigoDto) {
    return 'This action adds a new tipoCodigo';
  }

  findAll() {
    return `This action returns all tipoCodigos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tipoCodigo`;
  }

  update(id: number, updateTipoCodigoDto: UpdateTipoCodigoDto) {
    return `This action updates a #${id} tipoCodigo`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoCodigo`;
  }
}
