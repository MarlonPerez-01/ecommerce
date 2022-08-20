import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';
import { FindMarcasDto } from './dto/find-marcas.dto';
import { Marca } from './entities/marca.entity';
import { paginate } from '../common/helpers/paginate';

@Injectable()
export class MarcasService {
  constructor(
    @InjectRepository(Marca)
    private readonly marcasRepository: Repository<Marca>) {
  }

  async create(createMarcaDto: CreateMarcaDto) {
    const marca = await this.marcasRepository.create(createMarcaDto);

    const existe = await this.getByNombre(createMarcaDto.nombre);
    if (existe) throw new ConflictException();

    return this.marcasRepository.save(marca);
  }

  async findAll(findMarcasDto: FindMarcasDto) {
    const { page, limit, sort, order } = findMarcasDto;

    const skip = ((page - 1) * limit);

    const [data, totalItems] = await this.marcasRepository.findAndCount({
      take: limit, skip,
      order: { [sort]: order },
    });

    const pagination = paginate(page, limit, totalItems);

    return {
      data,
      totalItems,
      ...pagination,
    };
  }

  async findOne(id: number) {
    const marca = await this.marcasRepository.findOneBy({ id });
    if (!marca) throw new NotFoundException();
    return marca;
  }

  async update(id: number, updateMarcaDto: UpdateMarcaDto) {
    const marca = await this.marcasRepository.preload({
      id, ...updateMarcaDto,
    });

    if (!marca) throw new NotFoundException();

    return this.marcasRepository.save(marca);
  }

  async remove(id: number) {
    const marca = await this.findOne(id);
    return this.marcasRepository.softDelete(marca);
  }

  async getByNombre(nombre: string) {
    return this.marcasRepository.findOneBy({ nombre });
  }
}
