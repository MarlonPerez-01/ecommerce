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
import { EmailsService } from '../emails/emails.service';
import { Codigo } from '../codigos/entities/codigo.entity';
import { addMinutes } from '../common/helpers/Date';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,
    private readonly emailsService: EmailsService,
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

      const codigo = this.generateCodigo();
      await this.createCodigo(codigo, usuario, queryRunner);

      await this.emailsService.sendAccountConfirmation({
        to: registerAuthDto.correo,
        nombre: `${registerAuthDto.primerNombre} ${registerAuthDto.primerApellido}`,
        codigo,
      });

      return 'Usuario registrado';
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException();
    } finally {
      await queryRunner.release();
    }
  }

  private async createUsuario(
    usuario: Partial<Usuario>,
    queryRunner: QueryRunner,
  ) {
    const hash = await bcrypt.hash(usuario.contrasenia, 10);

    return queryRunner.manager.getRepository(Usuario).save({
      correo: usuario.correo,
      contrasenia: hash,
    });
  }

  private async createPersona(
    persona: Partial<Persona>,
    queryRunner: QueryRunner,
  ) {
    return queryRunner.manager.getRepository(Persona).save(persona);
  }

  private async createCliente(
    cliente: Partial<Cliente>,
    queryRunner: QueryRunner,
  ) {
    await queryRunner.manager.getRepository(Cliente).save({
      usuario: cliente.usuario,
      persona: cliente.persona,
    });
  }

  private generateCodigo() {
    const codigo = Math.floor(Math.random() * 100_000_000);
    return codigo.toString();
  }

  private async createCodigo(
    codigo: string,
    usuario: Usuario,
    queryRunner: QueryRunner,
  ) {
    await queryRunner.manager.getRepository(Codigo).save({
      codigo: codigo.toString(),
      tipo: 'correo',
      usuarioId: usuario.id,
      fechaExpiracion: addMinutes(new Date(), 15),
    });
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

  async logout() {
    return 'logout';
  }
}
