import { Test, TestingModule } from '@nestjs/testing';
import { TipoUsuariosService } from './tipo-usuarios.service';

describe('TipoUsuariosService', () => {
  let service: TipoUsuariosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipoUsuariosService],
    }).compile();

    service = module.get<TipoUsuariosService>(TipoUsuariosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
