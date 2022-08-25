import { Test, TestingModule } from '@nestjs/testing';
import { CuponesController } from './cupones.controller';
import { CuponesService } from './cupones.service';

describe('CuponesController', () => {
  let controller: CuponesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CuponesController],
      providers: [CuponesService],
    }).compile();

    controller = module.get<CuponesController>(CuponesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
