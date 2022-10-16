import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DireccionesModule } from '../direcciones/direcciones.module';
import { Persona } from './entities/persona.entity';
import { PersonasController } from './personas.controller';
import { PersonasService } from './personas.service';

@Module({
  imports: [TypeOrmModule.forFeature([Persona]), DireccionesModule],
  controllers: [PersonasController],
  providers: [PersonasService],
  exports: [PersonasService],
})
export class PersonasModule {}
