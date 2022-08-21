import { Test, TestingModule } from '@nestjs/testing';
import { ProveedoresService } from './proveedores.service';

describe('ProveedoresService', () => {
  let service: ProveedoresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProveedoresService],
    }).compile();

    service = module.get<ProveedoresService>(ProveedoresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
