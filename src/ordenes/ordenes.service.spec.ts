import { Test, TestingModule } from '@nestjs/testing';
import { OrdenesService } from './ordenes.service';

describe('OrdenesService', () => {
  let service: OrdenesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdenesService],
    }).compile();

    service = module.get<OrdenesService>(OrdenesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
