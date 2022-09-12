import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClientesModule } from '../clientes/clientes.module';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { ComentariosController } from './comentarios.controller';
import { ComentariosService } from './comentarios.service';
import { Comentario } from './entities/comentario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comentario]),
    ClientesModule,
    UsuariosModule,
  ],
  controllers: [ComentariosController],
  providers: [ComentariosService],
})
export class ComentariosModule {}
