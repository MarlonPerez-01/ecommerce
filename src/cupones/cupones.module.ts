import { Module } from '@nestjs/common';
import { CuponesService } from './cupones.service';
import { CuponesController } from './cupones.controller';

@Module({
  controllers: [CuponesController],
  providers: [CuponesService]
})
export class CuponesModule {}
