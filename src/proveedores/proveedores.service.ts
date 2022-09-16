import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { paginate } from '../common/helpers/paginate';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { FindProveedoresDto } from './dto/find-proveedores.dto';
import { UpdateProveedorDto } from './dto/update-proveedor.dto';
import { Proveedor } from './entities/proveedor.entity';

@Injectable()
export class ProveedoresService {
  constructor(
    @InjectRepository(Proveedor)
    private readonly proveedorRepository: Repository<Proveedor>,
  ) {}

  async create(createProveedoreDto: CreateProveedorDto) {
    const proveedor = this.proveedorRepository.create(createProveedoreDto);
    return this.proveedorRepository.save(proveedor);
  }

  async findAll(findProveedoresDto: FindProveedoresDto) {
    const {
      page,
      limit,
      sort,
      order,
      primerNombre,
      primerApellido,
      empresa,
      telefono,
      correo,
    } = findProveedoresDto;

    const skip = (page - 1) * limit;

    const [data, totalItems] = await this.proveedorRepository.findAndCount({
      take: limit,
      skip,
      order: { [sort]: order },
      where: {
        ...(primerNombre && {
          primerNombre: Like(`%${primerNombre}%`),
        }),
        ...(primerApellido && {
          primerApellido: Like(`%${primerApellido}%`),
        }),
        ...(empresa && {
          empresa: Like(`%${empresa}%`),
        }),
        ...(correo && {
          correo: Like(`%${correo}%`),
        }),
        ...(telefono && {
          telefono,
        }),
      },
    });

    const pagination = paginate(page, limit, totalItems);

    return {
      data,
      totalItems,
      ...pagination,
    };
  }

  async findOne(id: number) {
    const proveedor = await this.proveedorRepository.findOneBy({ id });
    if (!proveedor) throw new NotFoundException('Proveedor no encontrado');
    return proveedor;
  }

  async update(id: number, updateProveedoreDto: UpdateProveedorDto) {
    const proveedor = await this.proveedorRepository.preload({
      id,
      ...updateProveedoreDto,
    });

    if (!proveedor) throw new NotFoundException('Proveedor no encontrado');

    return this.proveedorRepository.save(proveedor);
  }

  async remove(id: number) {
    const proveedor = await this.findOne(id);
    if (!proveedor) throw new NotFoundException('Proveedor no encontrado');
    return this.proveedorRepository.softDelete(id);
  }
}
