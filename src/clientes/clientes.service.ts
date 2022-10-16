import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { DataSource, Repository } from 'typeorm';

import { CreateDireccionDto } from '../direcciones/dto/create-direccion.dto';
import { UpdateDireccionDto } from '../direcciones/dto/update-direccion.dto';
import { PersonasService } from '../personas/personas.service';
import { UsuariosService } from '../usuarios/usuarios.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Cliente } from './entities/cliente.entity';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
    private readonly dataSource: DataSource,
    private readonly personasService: PersonasService,
    private readonly usuariosService: UsuariosService,
  ) {}

  async create(createClienteDto: CreateClienteDto) {
    const cliente = this.clienteRepository.create(createClienteDto);
    return this.clienteRepository.save(cliente);
  }

  async findAll() {
    return this.clienteRepository.find();
  }

  async findOne(id: number) {
    const cliente = await this.clienteRepository.findOneBy({ id });
    if (!cliente) throw new NotFoundException('Cliente no encontrado');
    return cliente;
  }

  // TODO: un cliente deberia poder cambiar su correo
  async update(
    id: number,
    usuario: Usuario,
    updateClienteDto: UpdateClienteDto,
  ) {
    // Obtener cliente
    const cliente = await this.findOne(id);

    // Validar que el cliente que se quiere actualizar es el mismo que esta logueado
    if (cliente.id !== id) {
      throw new ForbiddenException('No puedes actualizar este cliente');
    }

    const persona = await this.personasService.update(
      cliente.personaId,
      updateClienteDto,
    );

    // Actualizar contraseña
    if (updateClienteDto.contrasenia && updateClienteDto.nuevaContrasenia) {
      await this.usuariosService.changePassword(
        usuario.id,
        updateClienteDto.contrasenia,
        updateClienteDto.nuevaContrasenia,
      );
    }

    return null;
  }

  async remove(id: number) {
    const cliente = await this.findOne(id);
    if (!cliente) throw new NotFoundException('Cliente no encontrado');
    return this.clienteRepository.softDelete(id);
  }

  async addDireccion(usuario: Usuario, createDireccionDto: CreateDireccionDto) {
    // Obtener cliente
    const usuarioWithCliente = await this.usuariosService.findOneWithCliente(
      usuario.id,
    );

    // Crear direccion y asociarla al cliente
    return this.personasService.addDireccion(
      usuarioWithCliente.personaId,
      createDireccionDto,
    );
  }

  async getDirecciones(usuario: Usuario) {
    // Obtener cliente
    const usuarioWithCliente = await this.usuariosService.findOneWithCliente(
      usuario.id,
    );

    return this.personasService.getDirecciones(usuarioWithCliente.personaId);
  }

  async getDireccion(usuario: Usuario, id: number) {
    // Obtener cliente
    const usuarioWithCliente = await this.usuariosService.findOneWithCliente(
      usuario.id,
    );

    return this.personasService.getDireccion(usuarioWithCliente.personaId, id);
  }

  async updateDireccion(
    usuario: Usuario,
    direccionId: number,
    updateDireccionDto: UpdateDireccionDto,
  ) {
    // Obtener cliente
    const usuarioWithCliente = await this.usuariosService.findOneWithCliente(
      usuario.id,
    );

    return this.personasService.updateDireccion(
      usuarioWithCliente.personaId,
      direccionId,
      updateDireccionDto,
    );
  }

  // TODO: validar que solo pueda eliminar una direccion que le pertenece
  async removeDireccion(usuario: Usuario, direccionId: number) {
    // Obtener cliente
    const usuarioWithCliente = await this.usuariosService.findOneWithCliente(
      usuario.id,
    );

    return this.personasService.removeDireccion(
      usuarioWithCliente.personaId,
      direccionId,
    );
  }
}
