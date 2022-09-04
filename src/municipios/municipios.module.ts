import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Municipio } from './entities/municipio.entity';
import { MunicipiosController } from './municipios.controller';
import { MunicipiosService } from './municipios.service';

@Module({
  controllers: [MunicipiosController],
  providers: [MunicipiosService],
  imports: [TypeOrmModule.forFeature([Municipio])],
})
export class MunicipiosModule {}
