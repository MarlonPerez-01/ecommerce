import { Test, TestingModule } from '@nestjs/testing';
import { MunicipiosService } from './municipios.service';

describe('MunicipiosService', () => {
  let service: MunicipiosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MunicipiosService],
    }).compile();

    service = module.get<MunicipiosService>(MunicipiosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
