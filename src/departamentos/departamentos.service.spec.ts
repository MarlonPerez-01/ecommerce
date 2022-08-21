import { Test, TestingModule } from '@nestjs/testing';
import { DepartamentosService } from './departamentos.service';

describe('DepartamentosService', () => {
  let service: DepartamentosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DepartamentosService],
    }).compile();

    service = module.get<DepartamentosService>(DepartamentosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
