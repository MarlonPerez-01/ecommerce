import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { IsNull, Not, Repository } from 'typeorm';

import { AuthService } from '../auth/auth.service';
import { Codigo } from '../codigos/entities/codigo.entity';
import { Departamento } from '../departamentos/entities/departamento.entity';
import { Municipio } from '../municipios/entities/municipio.entity';
import { Role } from '../roles/entities/roles.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { adminData } from './data/admin.data';
import { departamentosData } from './data/departamentos.data';
import { municipiosData } from './data/municipios.data';
import { rolesData } from './data/roles.data';
import { usuarioData } from './data/usuario.data';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Departamento)
    private readonly departamentos: Repository<Departamento>,
    @InjectRepository(Municipio)
    private readonly municipios: Repository<Municipio>,
    @InjectRepository(Usuario)
    private readonly usuarios: Repository<Usuario>,
    @InjectRepository(Codigo)
    private readonly codigos: Repository<Codigo>,
    private readonly authService: AuthService,
  ) {}

  async init() {
    console.log('Seeding...');

    const [rolesLength, departamentosLength, municipiosLength, usuariosLength] =
      await Promise.all([
        this.roleRepository.count(),
        this.municipios.count(),
        this.municipios.count(),
        this.usuarios.count(),
      ]);

    if (!rolesLength) await this.roleRepository.save(rolesData);

    if (!departamentosLength) await this.departamentos.save(departamentosData);

    if (!municipiosLength) await this.municipios.save(municipiosData);

    if (!usuariosLength) {
      // Creando el usuario administrador
      await this.createAdmin();

      // Creando el usuario de prueba
      await this.authService.signup(usuarioData);
      await this.codigos.update({ codigo: Not(IsNull()) }, { codigo: null });
    }

    return null;
  }

  private async createAdmin() {
    const hash = await bcrypt.hash(adminData.contrasenia, 10);

    await this.usuarios.save({
      id: adminData.id,
      correo: adminData.correo,
      contrasenia: hash,
      roleId: adminData.roleId,
      persona: {
        primerNombre: adminData.persona.primerNombre,
        segundoNombre: adminData.persona.segundoNombre,
        primerApellido: adminData.persona.primerApellido,
        segundoApellido: adminData.persona.segundoApellido,
      },
    });
  }
}
