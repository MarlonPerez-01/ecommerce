import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { Cliente } from '../clientes/entities/cliente.entity';
import { Persona } from '../personas/entities/persona.entity';
import { EmailsService } from '../emails/emails.service';
import { Codigo } from '../codigos/entities/codigo.entity';
import { Token } from '../tokens/entities/token.entity';
import { addMinutes } from '../common/helpers/Date';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
    private readonly jwtService: JwtService,
    private readonly emailsService: EmailsService,
    private readonly dataSource: DataSource,
  ) {}

  async signup(registerAuthDto: RegisterAuthDto) {
    const usuario = await this.findUsuarioByCorreo(registerAuthDto.correo);
    if (usuario) throw new BadRequestException('El correo ya existe');

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

  private async findUsuarioByCorreo(correo: string) {
    return this.usuariosRepository.findOne({
      where: { correo },
    });
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
      fechaExpiraciaon: addMinutes(new Date(), 15),
    });
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usuariosRepository.findOne({
      where: { correo: username },
    });

    const match = await this.verifyContrasenia(password, user.contrasenia);

    if (!match) {
      return null;
    }

    const { contrasenia, ...result } = user;
    return result;
  }

  async verifyContrasenia(plain: string, hash: string) {
    const match = await bcrypt.compare(plain, hash);
    if (!match) throw new UnauthorizedException();
    return true;
  }

  public getCookieWithJwtToken(id: number) {
    const payload: TokenPayload = { id };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${process.env.JWT_EXPIRATION_TIME}s}`;
  }

  async logout() {
    return 'logout';
  }

  async refreshToken() {
    return 'refresh';
  }
}
