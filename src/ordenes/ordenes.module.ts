import { Module } from '@nestjs/common';

import { OrdenesController } from './ordenes.controller';
import { OrdenesService } from './ordenes.service';

@Module({
  controllers: [OrdenesController],
  providers: [OrdenesService],
})
export class OrdenesModule {}
