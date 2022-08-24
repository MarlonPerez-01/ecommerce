import { Test, TestingModule } from '@nestjs/testing';
import { EmpleadosService } from './empleados.service';

describe('EmpleadosService', () => {
  let service: EmpleadosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmpleadosService],
    }).compile();

    service = module.get<EmpleadosService>(EmpleadosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
