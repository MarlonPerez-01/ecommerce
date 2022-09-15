import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Token } from './entities/token.entity';
import { TokensController } from './tokens.controller';
import { TokensService } from './tokens.service';

@Module({
  imports: [TypeOrmModule.forFeature([Token])],
  controllers: [TokensController],
  providers: [TokensService],
  exports: [TokensService],
})
export class TokensModule {}
