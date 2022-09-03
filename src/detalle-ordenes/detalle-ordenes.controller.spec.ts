import { Test, TestingModule } from '@nestjs/testing';

import { DetalleOrdenesController } from './detalle-ordenes.controller';
import { DetalleOrdenesService } from './detalle-ordenes.service';

describe('DetalleOrdenesController', () => {
  let controller: DetalleOrdenesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetalleOrdenesController],
      providers: [DetalleOrdenesService],
    }).compile();

    controller = module.get<DetalleOrdenesController>(DetalleOrdenesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
