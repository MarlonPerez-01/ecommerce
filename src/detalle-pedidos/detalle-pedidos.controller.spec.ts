import { Test, TestingModule } from '@nestjs/testing';

import { DetallePedidosController } from './detalle-pedidos.controller';
import { DetallePedidosService } from './detalle-pedidos.service';

describe('DetallePedidosController', () => {
  let controller: DetallePedidosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetallePedidosController],
      providers: [DetallePedidosService],
    }).compile();

    controller = module.get<DetallePedidosController>(DetallePedidosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
