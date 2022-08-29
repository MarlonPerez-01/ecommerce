import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import * as bcrypt from 'bcrypt';
import { Cliente } from '../clientes/entities/cliente.entity';
import { Direccion } from '../direcciones/entities/direccion.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,
    private readonly dataSource: DataSource,
  ) {}

  async signup(registerAuthDto: RegisterAuthDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const direccion = await this.createDireccion(
        registerAuthDto.direccion,
        queryRunner,
      );

      const usuario = await this.createUsuario(
        {
          correo: registerAuthDto.correo,
          contrasenia: registerAuthDto.contrasenia,
        },
        queryRunner,
      );

      await this.createCliente({ direccion, usuario }, queryRunner);

      await queryRunner.commitTransaction();

      return 'Usuario registrado';
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException();
    } finally {
      await queryRunner.release();
    }
  }

  async createDireccion(
    direccion: Partial<Direccion>,
    queryRunner: QueryRunner,
  ) {
    return queryRunner.manager.getRepository(Direccion).save(direccion);
  }

  async createUsuario(usuario: Partial<Usuario>, queryRunner: QueryRunner) {
    const hash = await bcrypt.hash(usuario.contrasenia, 10);

    return queryRunner.manager.getRepository(Usuario).save({
      correo: usuario.correo,
      contrasenia: hash,
    });
  }

  async createCliente(cliente: Partial<Cliente>, queryRunner: QueryRunner) {
    await queryRunner.manager
      .getRepository(Cliente)
      .save({ usuario: cliente.usuario, direccion: cliente.direccion });
  }

  async login(loginAuthDto: LoginAuthDto) {
    return 'login';
  }

  async logout() {
    return 'logout';
  }
}
