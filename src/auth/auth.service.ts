import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Cliente } from '../clientes/entities/cliente.entity';
import { Persona } from '../personas/entities/persona.entity';

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
      const usuario = await this.createUsuario(
        {
          correo: registerAuthDto.correo,
          contrasenia: registerAuthDto.contrasenia,
        },
        queryRunner,
      );

      const persona = await this.createPersona(
        {
          primerNombre: registerAuthDto.primerNombre,
          segundoNombre: registerAuthDto.segundoNombre,
          primerApellido: registerAuthDto.primerApellido,
          segundoApellido: registerAuthDto.segundoApellido,
        },
        queryRunner,
      );

      await this.createCliente({ usuario, persona }, queryRunner);

      await queryRunner.commitTransaction();

      return 'Usuario registrado';
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException();
    } finally {
      await queryRunner.release();
    }
  }

  async createUsuario(usuario: Partial<Usuario>, queryRunner: QueryRunner) {
    const hash = await bcrypt.hash(usuario.contrasenia, 10);

    return queryRunner.manager.getRepository(Usuario).save({
      correo: usuario.correo,
      contrasenia: hash,
    });
  }

  async createPersona(persona: Partial<Persona>, queryRunner: QueryRunner) {
    return queryRunner.manager.getRepository(Persona).save(persona);
  }

  async createCliente(cliente: Partial<Cliente>, queryRunner: QueryRunner) {
    await queryRunner.manager.getRepository(Cliente).save({
      usuario: cliente.usuario,
      persona: cliente.persona,
    });
  }

  async logout() {
    return 'logout';
  }

  async login(loginAuthDto: LoginAuthDto) {
    const usuario = await this.usuariosRepository.findOne({
      where: { correo: loginAuthDto.correo },
    });

    const match = await bcrypt.compare(
      loginAuthDto.contrasenia,
      usuario.contrasenia,
    );

    if (!match) throw new UnauthorizedException();

    return 'Has iniciado sesion';
  }
}
