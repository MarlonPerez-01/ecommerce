import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { DataSource, QueryRunner, Repository } from 'typeorm';

import { Cliente } from '../clientes/entities/cliente.entity';
import { Codigo } from '../codigos/entities/codigo.entity';
import { CodigoEnum } from '../common/enums/codigo.enum';
import { RoleEnum } from '../common/enums/role.enum';
import { addMinutes } from '../common/helpers/Date';
import { EmailsService } from '../emails/emails.service';
import { Persona } from '../personas/entities/persona.entity';
import { Role } from '../roles/entities/roles.entity';
import { Token } from '../tokens/entities/token.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { CambiarContraseniaDto } from './dto/cambiar-contrasenia.dto';
import { RefreshAuthDto } from './dto/refresh-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { VerifyAccountDto } from './dto/verify-account.dto';
import { JwtRefreshPayload } from './interfaces/jwt-refresh.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
    @InjectRepository(Codigo)
    private readonly codigoRepository: Repository<Codigo>,
    private readonly jwtService: JwtService,
    private readonly emailsService: EmailsService,
    private readonly dataSource: DataSource,
  ) {}

  async login(usuario: Usuario) {
    return this.generateTokens(usuario);
  }

  async signup(registerAuthDto: RegisterAuthDto) {
    // Verificar si ya existe usuario con ese correo
    const usuario = await this.usuariosRepository.findOneBy({
      correo: registerAuthDto.correo,
    });

    if (usuario) throw new BadRequestException('El correo ya existe');

    // Inicia transaccion para crear usuario, cliente y persona
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Obtener rol de cliente
      const role = await queryRunner.manager.findOne(Role, {
        where: {
          role: RoleEnum.CLIENTE,
        },
      });

      // Crear persona
      const persona = await this.createPersona(
        {
          primerNombre: registerAuthDto.primerNombre,
          segundoNombre: registerAuthDto.segundoNombre,
          primerApellido: registerAuthDto.primerApellido,
          segundoApellido: registerAuthDto.segundoApellido,
        },
        queryRunner,
      );

      // Crear usuario
      const usuario = await this.createUsuario(
        {
          correo: registerAuthDto.correo,
          contrasenia: registerAuthDto.contrasenia,
          role,
          persona,
        },
        queryRunner,
      );

      await this.createCliente({ persona }, queryRunner);

      // Generar codigo para verificar correo
      const codigo = this.generateCodigo();
      await this.createCodigo(codigo, usuario, queryRunner);

      await queryRunner.commitTransaction();

      // Enviar correo con codigo de verificacion
      await this.emailsService.sendAccountConfirmation({
        to: registerAuthDto.correo,
        nombre: `${registerAuthDto.primerNombre} ${registerAuthDto.primerApellido}`,
        codigo,
      });

      return 'Usuario registrado, verifique su correo';
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException();
    } finally {
      await queryRunner.release();
    }
  }

  private async createPersona(
    persona: Partial<Persona>,
    queryRunner: QueryRunner,
  ) {
    return queryRunner.manager.getRepository(Persona).save(persona);
  }

  private async createUsuario(
    usuario: Partial<Usuario>,
    queryRunner: QueryRunner,
  ) {
    const hash = await bcrypt.hash(usuario.contrasenia, 10);

    return queryRunner.manager.getRepository(Usuario).save({
      correo: usuario.correo,
      contrasenia: hash,
      role: usuario.role,
      persona: usuario.persona,
    });
  }

  private async createCliente(
    cliente: Partial<Cliente>,
    queryRunner: QueryRunner,
  ) {
    await queryRunner.manager.getRepository(Cliente).save({
      persona: cliente.persona,
    });
  }

  private generateCodigo() {
    const codigo = Math.floor(Math.random() * 100_000_000);
    return codigo.toString();
  }

  // Crea codigo de verificacion y lo almacena en la base de datos
  private async createCodigo(
    codigo: string,
    usuario: Usuario,
    queryRunner: QueryRunner,
  ) {
    await queryRunner.manager.getRepository(Codigo).save({
      codigo: codigo.toString(),
      tipo: CodigoEnum.VERIFICACION,
      usuarioId: usuario.id,
      fechaExpiracion: addMinutes(new Date(), 15),
    });
  }

  // Obtiene usuario si las credenciales son correctas
  async getUsuarioAutenticado(correo: string, plainContrasenia: string) {
    // FIXME: optimizar query
    const usuario = await this.usuariosRepository.findOne({
      where: { correo },
      relations: ['role', 'persona', 'persona.cliente'],
    });

    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    // Valida que el usuario ya haya verificado su cuenta
    const codigo = await this.codigoRepository.findOneBy({
      usuarioId: usuario.id,
      tipo: CodigoEnum.VERIFICACION,
    });

    if (codigo?.codigo) throw new UnauthorizedException('Verifica tu cuenta');

    // Valida las credenciales
    const match = await this.verifyContrasenia(
      plainContrasenia,
      usuario.contrasenia,
    );

    if (!match) throw new UnauthorizedException('Credenciales incorrectas');

    usuario.contrasenia = undefined;
    return usuario;
  }

  async generateTokens(usuario: Usuario) {
    const accessToken = this.generateAccessToken(usuario);
    const refreshToken = await this.generateRefreshToken(usuario);

    return { accessToken, refreshToken };
  }

  generateAccessToken(usuario: Usuario) {
    const payload = {
      sub: usuario.id,
      correo: usuario.correo,
      nombre: `${usuario.persona.primerNombre} ${usuario.persona.primerApellido}`,
      role: usuario.role.role,
    };

    return this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_ACCESS_EXPIRATION_MINUTES + 'm',
      secret: process.env.JWT_ACCESS_SECRET,
    });
  }

  // Genera refresh token y lo almacena en la base de datos
  async generateRefreshToken(usuario: Usuario) {
    const payload = { sub: usuario.id };

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_REFRESH_EXPIRATION_MINUTES + 'm',
      secret: process.env.JWT_REFRESH_SECRET,
    });

    const token = this.tokenRepository.create({
      idUsuario: usuario.id,
      token: refreshToken,
    });

    await this.tokenRepository.save(token);

    return refreshToken;
  }

  private async decodeRefreshToken(token: string): Promise<JwtRefreshPayload> {
    return this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_REFRESH_SECRET,
    });
  }

  async generateAccessTokenFromRefreshToken(refreshToken: string) {
    const decodedToken = await this.decodeRefreshToken(refreshToken);

    //FIXME: optimizar query
    const usuario = await this.usuariosRepository.findOne({
      where: {
        id: decodedToken.sub,
      },
      relations: ['cliente', 'cliente.persona'],
    });

    if (!usuario) throw new NotFoundException();

    return this.generateAccessToken(usuario);
  }

  async getUsuarioById(id: number) {
    return await this.usuariosRepository.findOne({
      where: { id },
      relations: ['role', 'persona', 'persona.cliente'],
    });
  }

  async verifyContrasenia(plain: string, hash: string) {
    const match = await bcrypt.compare(plain, hash);
    if (!match) throw new UnauthorizedException('Credenciales incorrectas');
    return true;
  }

  async logout(idUsuario: number) {
    await this.tokenRepository.softDelete({ idUsuario });
    return null;
  }

  async refreshToken(refreshAuthDto: RefreshAuthDto) {
    const { refreshToken } = refreshAuthDto;
    return this.generateAccessTokenFromRefreshToken(refreshToken);
  }

  async verifyAccount(verifyAccountDto: VerifyAccountDto) {
    const codigo = await this.codigoRepository.findOneBy({
      codigo: verifyAccountDto.codigo,
    });

    if (!codigo) throw new NotFoundException('Codigo no encontrado');

    return this.codigoRepository.softDelete({ id: codigo.id });
  }

  async enviarCorreoCambiarContrasenia(correo: string) {
    // Generar codigo para cambiar contrasenia
    const codigoGenerado = this.generateCodigo();

    // Obtener usuario
    const usuario = await this.usuariosRepository.findOne({
      where: { correo },
      relations: ['persona'],
    });

    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    // Crear codigo y almacenarlo en la base de datos
    const codigo = this.codigoRepository.create({
      codigo: codigoGenerado,
      tipo: CodigoEnum.CAMBIO_CONTRASENIA,
      usuarioId: usuario.id,
      fechaExpiracion: addMinutes(new Date(), 15),
    });

    await this.codigoRepository.save(codigo);

    // Enviar correo con codigo de verificacion
    return await this.emailsService.sendAccountConfirmation({
      to: correo,
      nombre: `${usuario.persona.primerNombre} ${usuario.persona.primerApellido}`,
      codigo: codigoGenerado,
    });
  }

  async cambiarContrasenia(cambiarContraseniaDto: CambiarContraseniaDto) {
    const codigoVerificacion = await this.codigoRepository.findOneBy({
      codigo: cambiarContraseniaDto.codigo,
      tipo: CodigoEnum.CAMBIO_CONTRASENIA,
    });

    if (!codigoVerificacion) {
      throw new NotFoundException('Codigo no encontrado');
    }

    const usuario = await this.getUsuarioById(codigoVerificacion.usuarioId);

    const hash = await bcrypt.hash(cambiarContraseniaDto.contrasenia, 10);

    return this.usuariosRepository.update(usuario.id, { contrasenia: hash });
  }

  async resendConfirmationEmail(correo: string) {
    // Obtener usuario
    const usuario = await this.usuariosRepository.findOne({
      where: { correo },
      relations: ['persona'],
    });

    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    // Obtener codigo de verificacion
    const codigo = await this.codigoRepository.findOne({
      where: { usuarioId: usuario.id, tipo: CodigoEnum.VERIFICACION },
      withDeleted: true,
    });

    if (!codigo) throw new NotFoundException('Correo no encontrado');

    if (codigo.fechaExpiracion > new Date()) {
      throw new BadRequestException('El codigo no ha expirado aun');
    }

    // Generar nuevo codigo y actualizarlo en la base de datos
    const codigoVerificacion = this.generateCodigo();

    await this.codigoRepository.update(codigo.id, {
      codigo: codigoVerificacion,
      fechaExpiracion: addMinutes(new Date(), 15),
    });

    // Enviar correo con codigo de verificacion
    return await this.emailsService.sendAccountConfirmation({
      to: correo,
      nombre: `${usuario.persona.primerNombre} ${usuario.persona.primerApellido}`,
      codigo: codigoVerificacion,
    });
  }
}
