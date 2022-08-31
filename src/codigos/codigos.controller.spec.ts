import { Test, TestingModule } from '@nestjs/testing';
import { CodigosController } from './codigos.controller';
import { CodigosService } from './codigos.service';

describe('CodigosController', () => {
  let controller: CodigosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CodigosController],
      providers: [CodigosService],
    }).compile();

    controller = module.get<CodigosController>(CodigosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
