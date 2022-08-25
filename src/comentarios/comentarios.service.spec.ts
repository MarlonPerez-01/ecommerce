import { Test, TestingModule } from '@nestjs/testing';
import { ComentariosService } from './comentarios.service';

describe('ComentariosService', () => {
  let service: ComentariosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComentariosService],
    }).compile();

    service = module.get<ComentariosService>(ComentariosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
