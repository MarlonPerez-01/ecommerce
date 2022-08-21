import { Module } from '@nestjs/common';
import { MunicipiosService } from './municipios.service';
import { MunicipiosController } from './municipios.controller';
import { Municipio } from './entities/municipio.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [MunicipiosController],
  providers: [MunicipiosService],
  imports: [TypeOrmModule.forFeature([Municipio])],
})
export class MunicipiosModule {}
