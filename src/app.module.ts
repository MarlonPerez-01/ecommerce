import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MarcasModule } from './marcas/marcas.module';
import { CategoriasModule } from './categorias/categorias.module';
import { ProductosModule } from './productos/productos.module';
import { DescuentosModule } from './descuentos/descuentos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        CLIENT_URL: Joi.required(),
        DB_HOST: Joi.required(),
        DB_NAME: Joi.required(),
        DB_PASSWORD: Joi.required(),
        DB_USER: Joi.required(),
        DB_PORT: Joi.required(),
        NODE_ENV: Joi.required(),
        PORT: Joi.required(),
      }),
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
