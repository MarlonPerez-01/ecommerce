import { Test, TestingModule } from '@nestjs/testing';
import { OrdenesController } from './ordenes.controller';
import { OrdenesService } from './ordenes.service';

describe('OrdenesController', () => {
  let controller: OrdenesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdenesController],
      providers: [OrdenesService],
    }).compile();

    controller = module.get<OrdenesController>(OrdenesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
