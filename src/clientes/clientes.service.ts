import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Cliente } from './entities/cliente.entity';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  create(createClienteDto: CreateClienteDto) {
    const cliente = this.clienteRepository.create(createClienteDto);
    return this.clienteRepository.save(cliente);
  }

  async findAll() {
    return this.clienteRepository.find();
  }

  async findOne(id: number) {
    return this.clienteRepository.findOne({ where: { id } });
  }

  async update(id: number, updateClienteDto: UpdateClienteDto) {
    const cliente = await this.clienteRepository.preload({
      id,
      ...updateClienteDto,
    });

    if (!cliente) throw new NotFoundException();
    return this.clienteRepository.save(cliente);
  }

  async remove(id: number) {
    return this.clienteRepository.softDelete({ id });
  }
}
