import { Test, TestingModule } from '@nestjs/testing';

import { DetalleOrdenesService } from './detalle-ordenes.service';

describe('DetalleOrdenesService', () => {
  let service: DetalleOrdenesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetalleOrdenesService],
    }).compile();

    service = module.get<DetalleOrdenesService>(DetalleOrdenesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
