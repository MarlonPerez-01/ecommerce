import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { EmailsModule } from '../emails/emails.module';

@Module({
  imports: [EmailsModule, TypeOrmModule.forFeature([Usuario])],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
