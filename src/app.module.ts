import { Module } from '@nestjs/common';
import { configuration } from './config/configuration';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriasModule } from './categorias/categorias.module';
import { ClientesModule } from './clientes/clientes.module';
import { ConfigModule } from '@nestjs/config';
import { DepartamentosModule } from './departamentos/departamentos.module';
import { DescuentosModule } from './descuentos/descuentos.module';
import { DetallePedidosModule } from './detalle-pedidos/detalle-pedidos.module';
import { DireccionesModule } from './direcciones/direcciones.module';
import { EmpleadosModule } from './empleados/empleados.module';
import { InventariosModule } from './inventarios/inventarios.module';
import { LocalFileModule } from './local-file/local-file.module';
import { MarcasModule } from './marcas/marcas.module';
import { MunicipiosModule } from './municipios/municipios.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { PersonasModule } from './personas/personas.module';
import { ProductosModule } from './productos/productos.module';
import { ProveedoresModule } from './proveedores/proveedores.module';
import { TipoUsuariosModule } from './tipo-usuarios/tipo-usuarios.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import { CuponesModule } from './cupones/cupones.module';
import { ComentariosModule } from './comentarios/comentarios.module';
import { CargosModule } from './cargos/cargos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: configuration,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [],
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV === 'development',
    }),
    CategoriasModule,
    ClientesModule,
    DepartamentosModule,
    DescuentosModule,
    DetallePedidosModule,
    DireccionesModule,
    EmpleadosModule,
    InventariosModule,
    LocalFileModule,
    MarcasModule,
    MunicipiosModule,
    PedidosModule,
    PersonasModule,
    ProductosModule,
    ProveedoresModule,
    TipoUsuariosModule,
    UsuariosModule,
    CuponesModule,
    ComentariosModule,
    CargosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
