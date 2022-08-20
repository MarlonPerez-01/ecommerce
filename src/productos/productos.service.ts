import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'src/common/helpers/paginate';
import { Repository } from 'typeorm';
import { CreateProductoDto } from './dto/create-producto.dto';
import { FindProductosDTO } from './dto/find-productos.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './entities/producto.entity';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}

  async create(createProductoDto: CreateProductoDto) {
    const producto = await this.productoRepository.create(createProductoDto);
    return this.productoRepository.save(producto);
  }

  async findAll(findProductosDTO: FindProductosDTO) {
    const { page, limit, sort, order } = findProductosDTO;

    const skip = (page - 1) * limit;

    const [data, totalItems] = await this.productoRepository.findAndCount({
      take: limit,
      skip,
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
    const producto = await this.productoRepository.findOneBy({ id });
    if (!producto) throw new NotFoundException();
    return producto;
  }

  async update(id: number, updateProductoDto: UpdateProductoDto) {
    const producto = await this.productoRepository.preload({
      id,
      ...updateProductoDto,
    });

    if (!producto) throw new NotFoundException();

    return this.productoRepository.save(producto);
  }

  async remove(id: number) {
    const producto = await this.findOne(id);
    return this.productoRepository.softDelete(producto);
  }
}
