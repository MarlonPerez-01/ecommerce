import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Proveedor } from './entities/proveedor.entity';
import { ProveedoresController } from './proveedores.controller';
import { ProveedoresService } from './proveedores.service';

@Module({
  imports: [TypeOrmModule.forFeature([Proveedor])],
  controllers: [ProveedoresController],
  providers: [ProveedoresService],
  exports: [ProveedoresService],
})
export class ProveedoresModule {}
