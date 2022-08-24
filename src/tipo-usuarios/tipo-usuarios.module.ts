import { Module } from '@nestjs/common';
import { TipoUsuariosService } from './tipo-usuarios.service';
import { TipoUsuariosController } from './tipo-usuarios.controller';

@Module({
  controllers: [TipoUsuariosController],
  providers: [TipoUsuariosService]
})
export class TipoUsuariosModule {}
