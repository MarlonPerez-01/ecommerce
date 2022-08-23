import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'src/common/helpers/paginate';
import { Repository } from 'typeorm';
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
    const { page, limit, sort, order } = findProveedoresDto;

    const skip = (page - 1) * limit;

    const [data, totalItems] = await this.proveedorRepository.findAndCount({
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
    const proveedor = await this.proveedorRepository.findOneBy({ id });
    if (!proveedor) throw new NotFoundException();
    return proveedor;
  }

  async update(id: number, updateProveedoreDto: UpdateProveedorDto) {
    const proveedor = await this.proveedorRepository.preload({
      id,
      ...updateProveedoreDto,
    });

    if (!proveedor) throw new NotFoundException();

    return this.proveedorRepository.save(proveedor);
  }

  async remove(id: number) {
    const proveedor = await this.findOne(id);
    return this.proveedorRepository.softDelete(proveedor);
  }
}
