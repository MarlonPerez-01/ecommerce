import { Test, TestingModule } from '@nestjs/testing';
import { MarcasController } from './marcas.controller';
import { MarcasService } from './marcas.service';

describe('MarcasController', () => {
  let controller: MarcasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MarcasController],
      providers: [MarcasService],
    }).compile();

    controller = module.get<MarcasController>(MarcasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
