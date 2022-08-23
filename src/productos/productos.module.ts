import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { MarcasModule } from 'src/marcas/marcas.module';
import { CategoriasModule } from 'src/categorias/categorias.module';
import { Marca } from 'src/marcas/entities/marca.entity';
import { Categoria } from 'src/categorias/entities/categoria.entity';

@Module({
  controllers: [ProductosController],
  providers: [ProductosService],
  imports: [
    TypeOrmModule.forFeature([Producto, Marca, Categoria]),
    MarcasModule,
    CategoriasModule,
  ],
})
export class ProductosModule {}
