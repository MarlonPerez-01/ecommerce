import { Test, TestingModule } from '@nestjs/testing';
import { DireccionesService } from './direcciones.service';

describe('DireccionesService', () => {
  let service: DireccionesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DireccionesService],
    }).compile();

    service = module.get<DireccionesService>(DireccionesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
