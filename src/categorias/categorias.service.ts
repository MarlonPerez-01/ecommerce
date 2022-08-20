import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';
import { Repository } from 'typeorm';
import { FindCategoriasDto } from './dto/find-categorias.dto';
import { paginate } from '../common/helpers/paginate';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {
  }

  async create(createCategoriaDto: CreateCategoriaDto) {
    const categoria = await this.categoriaRepository.create(createCategoriaDto);

    const existe = await this.getByNombre(createCategoriaDto.nombre);

    if (existe) throw new ConflictException();

    return this.categoriaRepository.save(categoria);
  }

  async findAll(findCategoriasDto: FindCategoriasDto) {
    const { page, limit, sort, order } = findCategoriasDto;

    const skip = ((page - 1) * limit);

    const [data, totalItems] = await this.categoriaRepository.findAndCount({
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
    const categoria = await this.categoriaRepository.findOneBy({ id });
    if (!categoria) throw new NotFoundException();
    return categoria;
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    const marca = await this.categoriaRepository.preload({
      id, ...updateCategoriaDto,
    });

    if (!marca) throw new NotFoundException();

    return this.categoriaRepository.save(marca);
  }

  async remove(id: number) {
    const categoria = await this.findOne(id);
    return this.categoriaRepository.softDelete(categoria);
  }

  async getByNombre(nombre: string) {
    return this.categoriaRepository.findOneBy({ nombre });
  }
}
