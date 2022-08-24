import { Test, TestingModule } from '@nestjs/testing';
import { EmpleadosController } from './empleados.controller';
import { EmpleadosService } from './empleados.service';

describe('EmpleadosController', () => {
  let controller: EmpleadosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmpleadosController],
      providers: [EmpleadosService],
    }).compile();

    controller = module.get<EmpleadosController>(EmpleadosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
