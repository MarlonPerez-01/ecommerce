import { Test, TestingModule } from '@nestjs/testing';
import { CodigosService } from './codigos.service';

describe('CodigosService', () => {
  let service: CodigosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CodigosService],
    }).compile();

    service = module.get<CodigosService>(CodigosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
