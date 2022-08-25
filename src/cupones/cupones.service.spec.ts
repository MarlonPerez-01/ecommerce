import { Test, TestingModule } from '@nestjs/testing';
import { CuponesService } from './cupones.service';

describe('CuponesService', () => {
  let service: CuponesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CuponesService],
    }).compile();

    service = module.get<CuponesService>(CuponesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
