import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PersonasModule } from '../personas/personas.module';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { ClientesController } from './clientes.controller';
import { ClientesService } from './clientes.service';
import { Cliente } from './entities/cliente.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cliente]),
    PersonasModule,
    UsuariosModule,
  ],
  controllers: [ClientesController],
  providers: [ClientesService],
  exports: [ClientesService],
})
export class ClientesModule {}
