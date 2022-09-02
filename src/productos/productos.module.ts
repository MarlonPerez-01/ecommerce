import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Marca } from '../marcas/entities/marca.entity';
import { Categoria } from '../categorias/entities/categoria.entity';
import { Proveedor } from '../proveedores/entities/proveedor.entity';
import { MarcasModule } from '../marcas/marcas.module';
import { CategoriasModule } from '../categorias/categorias.module';
import { ProveedoresModule } from '../proveedores/proveedores.module';

@Module({
  controllers: [ProductosController],
  providers: [ProductosService],
  imports: [
    TypeOrmModule.forFeature([Producto, Marca, Categoria, Proveedor]),
    MarcasModule,
    CategoriasModule,
    ProveedoresModule,
  ],
})
export class ProductosModule {}
