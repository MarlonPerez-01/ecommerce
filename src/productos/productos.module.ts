import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { MarcasModule } from 'src/marcas/marcas.module';
import { CategoriasModule } from 'src/categorias/categorias.module';
import { Marca } from 'src/marcas/entities/marca.entity';
import { Categoria } from 'src/categorias/entities/categoria.entity';
import { ProveedoresModule } from 'src/proveedores/proveedores.module';
import { Proveedor } from 'src/proveedores/entities/proveedor.entity';

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
