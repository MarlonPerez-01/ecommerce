import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configuration } from './config/configuration';
import { MarcasModule } from './marcas/marcas.module';
import { CategoriasModule } from './categorias/categorias.module';
import { ProductosModule } from './productos/productos.module';
import { DescuentosModule } from './descuentos/descuentos.module';
import { ClientesModule } from './clientes/clientes.module';
import { ProveedoresModule } from './proveedores/proveedores.module';
import { DepartamentosModule } from './departamentos/departamentos.module';
import { MunicipiosModule } from './municipios/municipios.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { LocalFileModule } from './local-file/local-file.module';
import { InventariosModule } from './inventarios/inventarios.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { DetallePedidosModule } from './detalle-pedidos/detalle-pedidos.module';
import { DireccionesModule } from './direcciones/direcciones.module';
import { PersonasModule } from './personas/personas.module';
import { EmpleadosModule } from './empleados/empleados.module';
import { TipoUsuariosModule } from './tipo-usuarios/tipo-usuarios.module';

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
    MarcasModule,
    CategoriasModule,
    ProductosModule,
    DescuentosModule,
    ClientesModule,
    ProveedoresModule,
    DepartamentosModule,
    MunicipiosModule,
    UsuariosModule,
    LocalFileModule,
    InventariosModule,
    PedidosModule,
    DetallePedidosModule,
    DireccionesModule,
    PersonasModule,
    EmpleadosModule,
    TipoUsuariosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
