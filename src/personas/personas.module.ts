import { Module } from '@nestjs/common';
import { PersonasService } from './personas.service';
import { PersonasController } from './personas.controller';

@Module({
  controllers: [PersonasController],
  providers: [PersonasService]
})
export class PersonasModule {}
