import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoriasModule } from '../categorias/categorias.module';
import { Categoria } from '../categorias/entities/categoria.entity';
import { DetalleCarrito } from '../detalle-carritos/entities/detalle-carrito.entity';
import { Inventario } from '../inventarios/entities/inventario.entity';
import { Marca } from '../marcas/entities/marca.entity';
import { MarcasModule } from '../marcas/marcas.module';
import { Proveedor } from '../proveedores/entities/proveedor.entity';
import { ProveedoresModule } from '../proveedores/proveedores.module';
import { Producto } from './entities/producto.entity';
import { ProductosController } from './productos.controller';
import { ProductosService } from './productos.service';

@Module({
  controllers: [ProductosController],
  providers: [ProductosService],
  imports: [
    TypeOrmModule.forFeature([
      Producto,
      Marca,
      Categoria,
      Proveedor,
      DetalleCarrito,
      Inventario,
    ]),
    MarcasModule,
    CategoriasModule,
    ProveedoresModule,
    DetalleCarrito,
  ],
  exports: [ProductosService],
})
export class ProductosModule {}
