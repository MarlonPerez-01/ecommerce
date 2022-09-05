import { Test, TestingModule } from '@nestjs/testing';

import { DetallePedidosService } from './detalle-pedidos.service';

describe('DetallePedidosService', () => {
  let service: DetallePedidosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetallePedidosService],
    }).compile();

    service = module.get<DetallePedidosService>(DetallePedidosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
