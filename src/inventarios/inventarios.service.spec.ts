import { Test, TestingModule } from '@nestjs/testing';
import { InventariosService } from './inventarios.service';

describe('InventariosService', () => {
  let service: InventariosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InventariosService],
    }).compile();

    service = module.get<InventariosService>(InventariosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
