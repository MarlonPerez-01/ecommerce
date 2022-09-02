import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { CreateProductoDto } from './dto/create-producto.dto';
import { FindProductosDTO } from './dto/find-productos.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './entities/producto.entity';
import { Marca } from '../marcas/entities/marca.entity';
import { Categoria } from '../categorias/entities/categoria.entity';
import { Proveedor } from '../proveedores/entities/proveedor.entity';
import { paginate } from '../common/helpers/paginate';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
    @InjectRepository(Marca)
    private readonly marcaRepository: Repository<Marca>,
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
    @InjectRepository(Proveedor)
    private readonly proveedorRepository: Repository<Proveedor>,
  ) {}

  async create(createProductoDto: CreateProductoDto) {
    const marca = await this.preloadMarcaByNombre(createProductoDto.marca);

    const categoria = await this.preloadCategoriaByNombre(
      createProductoDto.categoria,
    );

    const producto = this.productoRepository.create({
      nombre: createProductoDto.nombre,
      sku: createProductoDto.sku,
      slug: createProductoDto.slug,
      precioTienda: createProductoDto.precioTienda,
      precioVenta: createProductoDto.precioVenta,
      propiedades: createProductoDto.propiedades,
      ...(createProductoDto.imagenes && {
        imagenes: createProductoDto.imagenes.toString(),
      }),
      categoria,
      marca,
    });

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
    const producto = await this.productoRepository.findOne({
      where: { id },
      relations: ['marca', 'categoria', 'descuento'],
    });

    if (!producto) throw new NotFoundException();
    return producto;
  }

  async update(id: number, updateProductoDto: UpdateProductoDto) {
    const categoria =
      updateProductoDto.categoria &&
      (await this.preloadCategoriaByNombre(updateProductoDto.categoria));

    const marca =
      updateProductoDto.marca &&
      (await this.preloadMarcaByNombre(updateProductoDto.marca));

    const proveedor =
      updateProductoDto.proveedor &&
      (await this.proveedorRepository.findOneBy({
        id: updateProductoDto.proveedor,
      }));

    if (updateProductoDto.proveedor && !proveedor)
      throw new BadRequestException();

    const producto = await this.productoRepository.preload({
      id,
      ...updateProductoDto,
      categoria,
      proveedor,
      ...(updateProductoDto.imagenes && {
        imagenes: updateProductoDto.imagenes.toString(),
      }),
      marca,
    });

    return this.productoRepository.save(producto);
  }

  async remove(id: number) {
    const producto = await this.findOne(id);
    return this.productoRepository.softDelete(producto);
  }

  private async preloadMarcaByNombre(nombre: string): Promise<Marca> {
    const marcaExistente = await this.marcaRepository.findOneBy({ nombre });
    if (marcaExistente) {
      return marcaExistente;
    }
    return this.marcaRepository.create({ nombre });
  }

  private async preloadCategoriaByNombre(nombre: string): Promise<Categoria> {
    const categoriaExistente = await this.categoriaRepository.findOneBy({
      nombre,
    });
    if (categoriaExistente) {
      return categoriaExistente;
    }
    return this.categoriaRepository.create({ nombre });
  }
}
