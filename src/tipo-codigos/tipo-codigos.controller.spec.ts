import { Test, TestingModule } from '@nestjs/testing';
import { TipoCodigosController } from './tipo-codigos.controller';
import { TipoCodigosService } from './tipo-codigos.service';

describe('TipoCodigosController', () => {
  let controller: TipoCodigosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoCodigosController],
      providers: [TipoCodigosService],
    }).compile();

    controller = module.get<TipoCodigosController>(TipoCodigosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
