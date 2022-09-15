import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { Codigo } from '../codigos/entities/codigo.entity';
import { Departamento } from '../departamentos/entities/departamento.entity';
import { Municipio } from '../municipios/entities/municipio.entity';
import { Role } from '../roles/entities/roles.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { SeedService } from './seed.service';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Role, Departamento, Municipio, Usuario, Codigo]),
  ],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule implements OnModuleInit {
  constructor(private readonly seedService: SeedService) {}

  async onModuleInit() {
    await this.seedService.init();
  }
}
