import { Module } from '@nestjs/common';
import { OrdenesService } from './ordenes.service';
import { OrdenesController } from './ordenes.controller';

@Module({
  controllers: [OrdenesController],
  providers: [OrdenesService]
})
export class OrdenesModule {}
