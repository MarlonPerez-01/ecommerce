import { Test, TestingModule } from '@nestjs/testing';
import { TipoCodigosService } from './tipo-codigos.service';

describe('TipoCodigosService', () => {
  let service: TipoCodigosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipoCodigosService],
    }).compile();

    service = module.get<TipoCodigosService>(TipoCodigosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
