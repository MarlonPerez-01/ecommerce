import { Test, TestingModule } from '@nestjs/testing';
import { DescuentosController } from './descuentos.controller';
import { DescuentosService } from './descuentos.service';

describe('DescuentosController', () => {
  let controller: DescuentosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DescuentosController],
      providers: [DescuentosService],
    }).compile();

    controller = module.get<DescuentosController>(DescuentosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
