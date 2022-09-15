import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Categoria } from '../categorias/entities/categoria.entity';
import { paginate } from '../common/helpers/paginate';
import { Inventario } from '../inventarios/entities/inventario.entity';
import { Marca } from '../marcas/entities/marca.entity';
import { Proveedor } from '../proveedores/entities/proveedor.entity';
import { CreateProductoDto } from './dto/create-producto.dto';
import { FindProductosDTO } from './dto/find-productos.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './entities/producto.entity';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private readonly productosRepository: Repository<Producto>,
    @InjectRepository(Marca)
    private readonly marcasRepository: Repository<Marca>,
    @InjectRepository(Categoria)
    private readonly categoriasRepository: Repository<Categoria>,
    @InjectRepository(Proveedor)
    private readonly proveedoresRepository: Repository<Proveedor>,
    @InjectRepository(Inventario)
    private readonly inventariosRepository: Repository<Inventario>,
  ) {}

  async create(createProductoDto: CreateProductoDto) {
    const marca = await this.preloadMarcaByNombre(createProductoDto.marca);

    const categoria = await this.preloadCategoriaByNombre(
      createProductoDto.categoria,
    );

    const producto = this.productosRepository.create({
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
      inventario: {
        cantidad: createProductoDto.cantidad,
        entrante: createProductoDto.entrante,
        estropeado: createProductoDto.estropeado,
      },
    });

    return this.productosRepository.save(producto);
  }

  async findAll(findProductosDTO: FindProductosDTO) {
    const { page, limit, sort, order } = findProductosDTO;

    const skip = (page - 1) * limit;

    const [data, totalItems] = await this.productosRepository.findAndCount({
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
    const producto = await this.productosRepository.findOne({
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
      (await this.proveedoresRepository.findOneBy({
        id: updateProductoDto.proveedor,
      }));

    if (updateProductoDto.proveedor && !proveedor)
      throw new BadRequestException();

    const producto = await this.productosRepository.preload({
      id,
      ...updateProductoDto,
      categoria,
      proveedor,
      ...(updateProductoDto.imagenes && {
        imagenes: updateProductoDto.imagenes.toString(),
      }),
      marca,
    });

    return this.productosRepository.save(producto);
  }

  async remove(id: number) {
    const producto = await this.findOne(id);
    if (!producto) throw new NotFoundException('Producto no encontrado');
    return this.productosRepository.softDelete(id);
  }

  private async preloadMarcaByNombre(nombre: string): Promise<Marca> {
    const marcaExistente = await this.marcasRepository.findOneBy({ nombre });
    if (marcaExistente) {
      return marcaExistente;
    }
    return this.marcasRepository.create({ nombre });
  }

  private async preloadCategoriaByNombre(nombre: string): Promise<Categoria> {
    const categoriaExistente = await this.categoriasRepository.findOneBy({
      nombre,
    });
    if (categoriaExistente) {
      return categoriaExistente;
    }
    return this.categoriasRepository.create({ nombre });
  }
}
