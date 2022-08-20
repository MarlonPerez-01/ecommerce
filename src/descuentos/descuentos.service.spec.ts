import { Test, TestingModule } from '@nestjs/testing';
import { DescuentosService } from './descuentos.service';

describe('DescuentosService', () => {
  let service: DescuentosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DescuentosService],
    }).compile();

    service = module.get<DescuentosService>(DescuentosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
