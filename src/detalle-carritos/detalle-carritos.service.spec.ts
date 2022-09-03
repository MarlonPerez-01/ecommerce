import { Test, TestingModule } from '@nestjs/testing';

import { DetalleCarritosService } from './detalle-carritos.service';

describe('DetalleCarritosService', () => {
  let service: DetalleCarritosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetalleCarritosService],
    }).compile();

    service = module.get<DetalleCarritosService>(DetalleCarritosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
