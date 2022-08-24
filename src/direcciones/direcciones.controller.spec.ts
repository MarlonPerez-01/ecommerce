import { Test, TestingModule } from '@nestjs/testing';
import { DireccionesController } from './direcciones.controller';
import { DireccionesService } from './direcciones.service';

describe('DireccionesController', () => {
  let controller: DireccionesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DireccionesController],
      providers: [DireccionesService],
    }).compile();

    controller = module.get<DireccionesController>(DireccionesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
